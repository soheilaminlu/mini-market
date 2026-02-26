import { ProductFilterOptions, ProductListItems, ProductPaginationOptions, ProductPaginationResult, ProductSortOptions } from "src/core/ports/product.port";
import { RedisAdapter } from "../redis-adapter/redis-adapter";
import { Inject, Injectable } from "@nestjs/common";
import { PaginatedResult } from "src/core/ports/user.port";

@Injectable()
export class ProductRedisCache {
    private readonly cacheRepository: RedisAdapter
    constructor(@Inject() cacheRepository: RedisAdapter) {
        this.cacheRepository = cacheRepository
    }
    async getAllProductsIfExist(cacheKey: string): Promise<ProductPaginationResult | null> {
        const exist = await this.cacheRepository.exists(cacheKey)
        if (!exist) {
            return null;
        }
        const getValue = await this.cacheRepository.get(cacheKey)
        if (getValue == null) {
            return null;
        }
        return JSON.parse(getValue) as ProductPaginationResult
    }
    async setAllProducts(key: string, value: ProductPaginationResult, ttl?: number) {
        return await this.cacheRepository.set(key, JSON.stringify(value), ttl)
    }
    async getProductByIdIfExist(productId: string): Promise<ProductListItems | null> {
        const cacheKey = `products:item:${productId}`

        try {
            const cached = await this.cacheRepository.get(cacheKey)
            if (!cached) return null
            return JSON.parse(cached) as ProductListItems
        } catch (error) {
            console.error(`Redis get failed for key ${cacheKey}:`, error)
            return null
        }
    }
    async setProductById(productId: string, product: ProductListItems, ttl = 300): Promise<void> {
        const cacheKey = `products:item:${productId}`
        try {
            await this.cacheRepository.set(cacheKey, JSON.stringify(product), ttl)
        } catch (error) {
            console.error(`Redis set failed for key ${cacheKey}:`, error)
        }
    }
}