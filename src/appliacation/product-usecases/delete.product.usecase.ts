import { BadRequestException, Inject, InternalServerErrorException } from "@nestjs/common";
import { PRODUCT_REPOSITORY, type ProductRepositoryPorts } from "src/core/ports/product.port";
import { ProductRedisCache } from "src/infrastructure/cache/product-cache/product.cache";


export class DeleteProductUseCase {
    private readonly repository: ProductRepositoryPorts
    private readonly redisCache: ProductRedisCache
    constructor(@Inject(PRODUCT_REPOSITORY) repository:ProductRepositoryPorts , @Inject() redisCache: ProductRedisCache) {
        this.repository = repository  
        this.redisCache = redisCache
    }
    async execute(id: string): Promise<boolean> {
        try {
            const remove = await this.repository.deleteProductById(id)
            if (!remove) {
                throw new BadRequestException("Failed to delete")
            }
            return remove

        } catch (error) {
            throw new InternalServerErrorException(`Failed to delete product: ${error.message}`)
        }
    }
}