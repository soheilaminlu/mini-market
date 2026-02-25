import { InternalServerErrorException } from "@nestjs/common";
import { Product } from "src/core/domain/product";
import { ProductRepositoryPorts } from "src/core/ports/product.port"

export class GetProductByIdUseCase {
    private readonly repository: ProductRepositoryPorts
    constructor(repository: ProductRepositoryPorts) {
        this.repository = repository
    }
    async execute(id: string) {
        try {
            const product = await this.repository.getProductById(id)
            if (product == null) {
                return;
            }
            return product
        } catch (error) {
            throw new InternalServerErrorException(`Failed to get products: ${error.message}`)
        }
    }
}