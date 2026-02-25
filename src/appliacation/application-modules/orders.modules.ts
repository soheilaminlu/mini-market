import { OrderRepositoryModule } from "src/infrastructure/repository-modules/order.module";
import { CreateOrderUseCase } from "../order-usecases/create.order.usecase";
import { GetOrderUseCases } from "../order-usecases/get.order.usecase";
import { Module } from "@nestjs/common";
import { OrderControllers } from "src/presentation/controlletrs/order.controllers";

@Module({
    imports: [OrderRepositoryModule],
    controllers: [OrderControllers],
    providers: [CreateOrderUseCase, GetOrderUseCases],
})
export class OrderModule { }