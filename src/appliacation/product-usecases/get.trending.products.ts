import { Inject, Injectable } from "@nestjs/common";
import { ProductRedisCache } from "src/infrastructure/cache/product-cache/product.cache";

@Injectable()
export class GetTrendingUseCase {
    private readonly productCache:ProductRedisCache
    constructor(@Inject() productCache:ProductRedisCache) {
      this.productCache = productCache
    }
    
}