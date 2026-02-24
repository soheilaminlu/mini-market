import { Module } from "@nestjs/common";
import { PRODUCT_REPOSITORY } from "src/core/ports/product.port";
import { OrderRepositoryAdapter } from "../adapters/order.repository.adapter";
import { ProductRepositoryAdapter } from "../adapters/product.repository.adapter";

@Module({
   providers: [{
    provide: PRODUCT_REPOSITORY,
    useClass: ProductRepositoryAdapter
   }],
   exports: [PRODUCT_REPOSITORY]
})
export class ProductRepositoryModule {}