import { Module } from "@nestjs/common";
import { OrderRepositoryAdapter } from "../adapters/order.repository.adapter";
import { ORDER_REPOSITORY } from "src/core/ports/order.port";



@Module({
   providers: [{
    provide: ORDER_REPOSITORY,
    useClass: OrderRepositoryAdapter
   }],
   exports: [ORDER_REPOSITORY]
})
export class OrderRepositoryModule {}