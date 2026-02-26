import { Inject, InternalServerErrorException } from "@nestjs/common";
import { PRODUCT_REPOSITORY, type ProductRepositoryPorts } from "src/core/ports/product.port";


export class DeleteProductUseCase {
    private readonly repository: ProductRepositoryPorts
    constructor(@Inject(PRODUCT_REPOSITORY) repository:ProductRepositoryPorts) {
        this.repository = repository   
    }
    async execute(id:string) {
        try {
             return await this.repository.deleteProductById(id) 
        } catch (error) {
             throw new InternalServerErrorException(`Failed to delete product: ${error.message}`)
        } 
    }
}