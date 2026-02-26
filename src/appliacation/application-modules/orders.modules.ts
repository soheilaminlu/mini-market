import { OrderRepositoryModule } from "src/infrastructure/orm-modules/order.module";
import { CreateOrderUseCase } from "../order-usecases/create.order.usecase";

import { Module } from "@nestjs/common";
import { OrderControllers } from "src/presentation/controlletrs/order.controllers";
import { ProductModule } from "./product.modules";
import { ProductRepositoryModule } from "src/infrastructure/orm-modules/product.module";
import { UserRepositoryModule } from "src/infrastructure/orm-modules/user.module";
import { GetOrderByUserIdUseCases } from "../order-usecases/get.order.byUserId.usecase";

@Module({
    imports: [OrderRepositoryModule , ProductRepositoryModule , UserRepositoryModule],
    controllers: [OrderControllers],
    providers: [CreateOrderUseCase , GetOrderByUserIdUseCases],
})
export class OrderModule { }