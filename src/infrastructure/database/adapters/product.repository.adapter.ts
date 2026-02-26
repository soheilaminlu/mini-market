import { Product } from "src/core/domain/product";
import { ProductFilterOptions, ProductListItems, ProductPaginationOptions, ProductPaginationResult, ProductRepositoryPorts, ProductSortOptions, ProductSortType } from "src/core/ports/product.port";
import { Repository } from "typeorm";
import { ProductOrmEntity } from "../orm-entities/product.model";
import { InjectRepository } from "@nestjs/typeorm";
import { Inject, Injectable, InternalServerErrorException } from "@nestjs/common";
import { SelectQueryBuilder } from "typeorm/browser";
import { ProductRedisCache } from "src/infrastructure/cache/product-cache/product.cache";
import { json } from "stream/consumers";

@Injectable()
export class ProductRepositoryAdapter implements ProductRepositoryPorts {
    private readonly repo: Repository<ProductOrmEntity>
    private readonly redis: ProductRedisCache
    constructor(@InjectRepository(ProductOrmEntity) repo: Repository<ProductOrmEntity>, @Inject() redis: ProductRedisCache) {
        this.repo = repo
        this.redis = redis
    }
    async getAllProducts(pagination: ProductPaginationOptions, filter: ProductFilterOptions, sort: ProductSortOptions)
        : Promise<ProductPaginationResult> {
        try {
            const { page, limit } = pagination
            const cacheKey = `products:list:page=${page}:limit=${limit}:filter=${JSON.stringify(filter)}:sort=${JSON.stringify(sort)}`
            const cacheResult = await this.redis.getAllProductsIfExist(cacheKey)
            if (cacheResult != null) {
                return cacheResult
            }
            const skip = (page - 1) * limit
            const queryBuilder = this.repo.createQueryBuilder('product')
                .leftJoin('product.reviews', 'review')
                .addSelect('COALESCE(AVG(review.rating), 0)', 'averageRating')
                .addSelect('COUNT(review.id)', 'totalReviews')
                .groupBy('product.id')

            this.applyFilters(queryBuilder, filter)
            this.applySort(queryBuilder, sort)
            const totalItems = await queryBuilder.getCount()
            const products = await queryBuilder.skip(skip).take(limit).getRawAndEntities()
            const totalPages = Math.ceil(totalItems / limit)
            const hasNext = page < totalPages
            const hasPre = page > 1
            const listItems: ProductListItems[] = products.entities.map((product, index) => ({
                id: product.id,
                title: product.title,
                created_at: product.created_at,
                price: product.price,
                stock: product.stock,
                is_active: product.is_active,
                averageRating: Number(products.raw[index].averageRating) || 0,
                totalReviews: Number(products.raw[index].totalReviews) || 0
            }));
            const result: ProductPaginationResult = {
                data: listItems,
                pagination: {
                    page,
                    limit,
                    total_pages: totalPages,
                    has_next: hasNext,
                    has_previous: hasPre,
                    filtered_total: totalItems,
                },
                applied: {
                    filter,
                    sort
                }
            }
            await this.redis.setAllProducts(cacheKey, result , 300)
            return result
        } catch (error) {
            throw new InternalServerErrorException(`Failed to fetch products: ${error.message}`);
        }
    }
    async save(product: Product): Promise<void> {
        try {
            const productEntity = this.mapToOrm(product)
            await this.repo.save(productEntity)
        } catch (error) {
            throw new InternalServerErrorException(`failed to save product ${error.message}`);
        }
    }

    async getProductById(id: string): Promise<ProductListItems | null> {
        const cachedData = await this.redis.getProductByIdIfExist(id)
        if (cachedData != null) {
            return cachedData
        }
        const product = await this.repo.createQueryBuilder('product')
            .leftJoin('product.reviews', 'review')
            .addSelect('COALESCE(AVG(review.rating), 0)', 'averageRating')
            .addSelect('COUNT(review.id)', 'totalReviews')
            .where('product.id = :id', { id })
            .groupBy('product.id')
            .getRawAndEntities()

        if (!product.entities.length) {
            return null
        }
        const p = product.entities[0]
        const raw = product.raw[0]

        const response: ProductListItems = {
            id: p.id,
            title: p.title,
            price: p.price,
            stock: p.stock,
            is_active: p.is_active,
            created_at: p.created_at,
            averageRating: Number(raw.averageRating) || 0,
            totalReviews: Number(raw.totalReviews) || 0
        }
        await this.redis.setProductById(p.id, response)
        return response
    }
    async deleteProductById(id: string): Promise<boolean> {
        try {
            const product = await this.repo.findOne({ where: { id } })
            if (!product) {
                return false
            }
            await this.repo.remove(product)
            await this.redis.InvalidateProductById(id)
            return true
        } catch (error) {
            throw new InternalServerErrorException(`failed to delete product ${error.message}`);
        }
    }
    private mapToOrm(product: Product): ProductOrmEntity {
        const productOrm = new ProductOrmEntity()
        const prodcuctDomainDto = product.toDTO()
        productOrm.id = prodcuctDomainDto.id
        productOrm.title = prodcuctDomainDto.title
        productOrm.price = prodcuctDomainDto.price
        productOrm.stock = prodcuctDomainDto.stock
        productOrm.is_active = product.isAvailable()
        return productOrm
    }

    private applyFilters(qb: SelectQueryBuilder<ProductOrmEntity>, filter: ProductFilterOptions): void {
        if (filter.minPrice !== undefined) {
            qb.andWhere('product.price > :minprice', { minprice: filter.minPrice })
        }
        if (filter.maxPrice !== undefined) {
            qb.andWhere('product.price <= :maxprice', { maxprice: filter.maxPrice })
        }
        if (filter.minRating !== undefined) {
            qb.having('COALESCE(AVG(review.rating),0) >= :minRating', {
                minRating: filter.minRating,
            });
        }
        if (filter?.is_active !== undefined) {
            qb.andWhere('product.is_active = :active', { active: filter.is_active })
        }
    }
    private applySort(qb: SelectQueryBuilder<ProductOrmEntity>, sort: ProductSortOptions) {
        const sortFieldMap: Record<ProductSortType, string> = {
            newest: 'product.created_at',
            price: 'product.price',
            rating: 'averageRating'
        }
        const sortField = sortFieldMap[sort.sort_by ?? 'newest']
        const sortType: 'ASC' | 'DESC' = sort?.sort_type ?? 'DESC'
        qb.orderBy(sortField, sortType)
    }
}
