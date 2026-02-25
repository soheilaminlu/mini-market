import { InternalServerErrorException } from "@nestjs/common";
import { ProductRepositoryPorts } from "src/core/ports/product.port";


export class DeleteProductUseCase {
    private readonly repository: ProductRepositoryPorts
    constructor(repository:ProductRepositoryPorts) {
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