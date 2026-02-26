import { Inject, Injectable, InternalServerErrorException } from "@nestjs/common";
import { PRODUCT_REPOSITORY, type ProductFilterOptions, type ProductPaginationOptions, type ProductPaginationResult, type ProductRepositoryPorts, type ProductSortOptions } from "src/core/ports/product.port";

@Injectable()
export class GetAllProductUseCases {
    private readonly repository: ProductRepositoryPorts
    constructor(@Inject(PRODUCT_REPOSITORY) repository: ProductRepositoryPorts) {
        this.repository = repository
    }
    async execute(
        pagination: ProductPaginationOptions,
        filter: ProductFilterOptions,
        sort: ProductSortOptions
    ) : Promise<ProductPaginationResult> {
        try {
            return await this.repository.getAllProducts(pagination, filter, sort)
        } catch (error) {
            throw new InternalServerErrorException(`Failed to get products: ${error.message}`)
        }
    }
}

