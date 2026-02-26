import { Inject, InternalServerErrorException, NotFoundException } from "@nestjs/common";
import { PRODUCT_REPOSITORY, ProductListItems, type ProductRepositoryPorts } from "src/core/ports/product.port"

export class GetProductByIdUseCase {
    private readonly repository: ProductRepositoryPorts
    constructor(@Inject(PRODUCT_REPOSITORY) repository: ProductRepositoryPorts) {
        this.repository = repository
    }
    async execute(id: string) : Promise<ProductListItems> {
        try {
            const product = await this.repository.getProductById(id)
            if (product == null) {
                throw new NotFoundException("Not Found Product")
            }
            return product
        } catch (error) {
            throw new InternalServerErrorException(`Failed to get product: ${error.message}`)
        }
    }
}