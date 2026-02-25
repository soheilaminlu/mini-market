import { Controller, Get } from "@nestjs/common";
import { DeleteProductUseCase } from "src/appliacation/product-usecases/delete.product.usecase";
import { GetProductByIdUseCase } from "src/appliacation/product-usecases/get.product.usecase";
import { GetAllProductUseCases } from "src/appliacation/product-usecases/get.products.usecase";
import { Product } from "src/core/domain/product";

@Controller('orders')
export class ProductControllers {
    private readonly getproducts: GetAllProductUseCases
    private readonly getbyId: GetProductByIdUseCase
    private readonly delProduct: DeleteProductUseCase
    constructor(getproducts: GetAllProductUseCases, getById: GetProductByIdUseCase, delProduct: DeleteProductUseCase) {
        this.getproducts = getproducts
        this.getbyId = getById
        this.delProduct = delProduct
    }
    
}