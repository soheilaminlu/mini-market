import { ProductRepositoryModule } from "src/infrastructure/repository-modules/product.module";
import { ProductControllers } from "src/presentation/controlletrs/product.controllers";
import { GetAllProductUseCases } from "../product-usecases/get.products.usecase";
import { GetProductByIdUseCase } from "../product-usecases/get.product.usecase";
import { DeleteProductUseCase } from "../product-usecases/delete.product.usecase";
import { Module } from "@nestjs/common";

@Module({
    imports: [ProductRepositoryModule],
    controllers: [ProductControllers],
    providers: [GetAllProductUseCases, GetProductByIdUseCase , DeleteProductUseCase],
})
export class OrderModule { }