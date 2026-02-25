import { Product } from "src/core/domain/product";
import { ProductFilterOptions, ProductListItems, ProductPaginationOptions, ProductPaginationResult, ProductRepositoryPorts, ProductSortOptions, ProductSortType } from "src/core/ports/product.port";
import { Repository } from "typeorm";
import { ProductOrmEntity } from "../orm-entities/product.model";
import { InjectRepository } from "@nestjs/typeorm";
import { Injectable, InternalServerErrorException } from "@nestjs/common";
import { SelectQueryBuilder } from "typeorm/browser";


@Injectable()
export class ProductRepositoryAdapter implements ProductRepositoryPorts {
    private readonly repo: Repository<ProductOrmEntity>
    constructor(@InjectRepository(ProductOrmEntity) repo: Repository<ProductOrmEntity>) {
        this.repo = repo
    }

    async getAllProducts(pagination: ProductPaginationOptions, filter: ProductFilterOptions, sort: ProductSortOptions)
        : Promise<ProductPaginationResult> {
        try {
            const { page, limit } = pagination
            const skip = (page - 1) * limit

            const queryBuilder = this.repo.createQueryBuilder('product')
                .leftJoin('product.reviews', 'review')
                .addSelect('AVG(review.rating)', 'rating')
                .addSelect('COUNT(reviews.id)', 'totalReviews')
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
                averageRating: Number(products.raw[index].rating) || 0,
                totalReviews: Number(products.raw[index].totalReviews) || 0
            }));
            return {
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
                    filter: filter,
                    sort: sort
                }
            }
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
        const product = await this.repo.createQueryBuilder('product')
            .leftJoinAndSelect('product.reviews', 'review')
            .addSelect('AVG(review.rating)', 'avrageRating')
            .addSelect('COUNT(review.count)')
            .where('product.id = :id', { id })
            .groupBy('product.id')
            .getRawAndEntities()

        if (!product.entities.length) {
            return null
        }
        const p = product.entities[0]
        const raw = product.raw[0]
        return {
            id: p.id,
            title: p.title,
            price: p.price,
            stock: p.stock,
            is_active: p.is_active,
            created_at: p.created_at,
            averageRating: Number(raw.averageRating) || 0,
            totalReviews: Number(raw.totalReviews) || 0
        }
    }
    async deleteProductById(id: string): Promise<boolean> {
        try {
            const product = await this.repo.findOne({ where: { id } })
            if (!product) {
                return false
            }
            await this.repo.remove(product)
            return true
        } catch (error) {
            throw new InternalServerErrorException(`failed to delete product ${error.message}`);
        }
    }
    private mapToOrm(product: Product): ProductOrmEntity {
        const productOrm = new ProductOrmEntity()
        productOrm.id = product.getId()
        productOrm.title = product.getTitle()
        productOrm.price = product.getPrice()
        productOrm.stock = product.getStock()
        productOrm.is_active = product.getIsActive()
        return productOrm
    }

    private applyFilters(qb: SelectQueryBuilder<ProductOrmEntity>, filter: ProductFilterOptions): void {
        if (filter.minPrice !== undefined) {
            qb.andWhere('product.price > :minprice', { minprice: filter.minPrice })
        }
        if (filter.maxPrice !== undefined) {
            qb.andWhere('product.price <= maxprice', { maxprice: filter.maxPrice })
        }
        if (filter.minRating !== undefined) {
            qb.having('AVG(product.rating) >= minrating', { minrating: filter.minRating })
        }
        if (filter?.is_active !== undefined) {
            qb.andWhere('product.is_active = :active', { active: filter.is_active })
        }
    }
    private applySort(qb: SelectQueryBuilder<ProductOrmEntity>, sort: ProductSortOptions) {
        const sortFieldMap: Record<ProductSortType, string> = {
            newest: 'product.created_at',
            price: 'product.price',
            rating: 'AVG(product.rating)'
        }
        const sortField = sortFieldMap[sort.sort_by ?? 'newest']
        const sortType: 'ASC' | 'DESC' = sort?.sort_type ?? 'DESC'
        qb.orderBy(sortField, sortType)
    }
}
