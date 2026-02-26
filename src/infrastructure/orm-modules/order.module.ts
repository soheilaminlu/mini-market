import { Module } from "@nestjs/common";
import { OrderRepositoryAdapter } from "../database/adapters/order.repository.adapter";
import { ORDER_REPOSITORY } from "src/core/ports/order.port";
import { TypeOrmModule } from "@nestjs/typeorm";
import { OrderOrmEntity } from "../database/orm-entities/order.model";
import { OrderItemOrmEntity } from "../database/orm-entities/orderItem.model";



@Module({
   imports: [
      TypeOrmModule.forFeature([OrderOrmEntity , OrderItemOrmEntity])
   ],
   providers: [{
      provide: ORDER_REPOSITORY , 
      useClass: OrderRepositoryAdapter
   }],
   exports: [ORDER_REPOSITORY],
})
export class OrderRepositoryModule { }