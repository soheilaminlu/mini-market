import { Controller, Get, Param, Query } from "@nestjs/common";
import { DeleteProductUseCase } from "src/appliacation/product-usecases/delete.product.usecase";
import { GetProductByIdUseCase } from "src/appliacation/product-usecases/get.product.usecase";
import { GetAllProductUseCases } from "src/appliacation/product-usecases/get.products.usecase";
import { Product } from "src/core/domain/product";
import { GetProductsQueryDto } from "../dtos/product.dto";
import { PaginatedResult } from "src/core/ports/user.port";
import { ProductFilterOptions, ProductListItems, ProductPaginationOptions, ProductPaginationResult, ProductSortOptions } from "src/core/ports/product.port";
import { ApiOperation, ApiResponse } from "@nestjs/swagger";

@Controller('products')
export class ProductControllers {
    private readonly getproducts: GetAllProductUseCases
    private readonly getbyId: GetProductByIdUseCase
    private readonly delProduct: DeleteProductUseCase
    constructor(getproducts: GetAllProductUseCases, getById: GetProductByIdUseCase, delProduct: DeleteProductUseCase) {
        this.getproducts = getproducts
        this.getbyId = getById
        this.delProduct = delProduct
    }
    @Get('/all')
    @ApiOperation({ summary: 'Get all products' })
    @ApiResponse({ status: 200, description: 'List of products' })
    async getAll(@Query() query: GetProductsQueryDto): Promise<ProductPaginationResult> {
        const pagination: ProductPaginationOptions = {
            page: query.page,
            limit: query.limit
        };
        const filter: ProductFilterOptions = {
            minPrice: query.minPrice,
            maxPrice: query.maxPrice,
            minRating: query.minRating,
            maxRating: query.maxRating,
            is_active: query.is_active ?? true,
        };

        const sort: ProductSortOptions = {
            sort_by: query.sort_by,
            sort_type: query.sort_type,
        };
        return await this.getproducts.execute(pagination, filter, sort);
    }
    @Get(':id')
    @ApiOperation({ summary: 'Get Product By ID' })
    @ApiResponse({ status: 200, description: 'Product' })
    async getById(@Param('id') id: string): Promise<ProductListItems> {
        const product = await this.getbyId.execute(id);
        return product
    }
}