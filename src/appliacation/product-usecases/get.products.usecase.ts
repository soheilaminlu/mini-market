import { Injectable, InternalServerErrorException } from "@nestjs/common";
import type { ProductFilterOptions, ProductPaginationOptions, ProductRepositoryPorts, ProductSortOptions } from "src/core/ports/product.port";

@Injectable()
export class GetAllProductUseCases {
    private readonly repository: ProductRepositoryPorts
    constructor(repository: ProductRepositoryPorts) {
        this.repository = repository
    }
    async execute(
        pagination: ProductPaginationOptions,
        filter: ProductFilterOptions,
        sort: ProductSortOptions
    ) {
        try {
            return await this.repository.getAllProducts(pagination, filter, sort)
        } catch (error) {
            throw new InternalServerErrorException(`Failed to get products: ${error.message}`)
        }
    }
}