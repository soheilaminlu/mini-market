import { Body, Controller, Get, Param, Post } from "@nestjs/common";
import { CreateOrderUseCase } from "src/appliacation/order-usecases/create.order.usecase";
import { CreateOrderRequestDto, CreateOrderResponseDto, OrderResponseDto } from "../dtos/order.dto";
import { Order } from "src/core/domain/order";
import { GetOrderByUserIdUseCases } from "src/appliacation/order-usecases/get.order.byUserId.usecase";
import { ApiOperation, ApiResponse } from "@nestjs/swagger";

@Controller('orders')
export class OrderControllers {
    private readonly createOrderUseCase: CreateOrderUseCase
    private readonly getOrderByUserIdUseCase: GetOrderByUserIdUseCases

    constructor(createOrderUseCase: CreateOrderUseCase, getOrderByUserId: GetOrderByUserIdUseCases) {
        this.createOrderUseCase = createOrderUseCase
        this.getOrderByUserIdUseCase = getOrderByUserId
    }
    @Post('/create')
    @ApiResponse({ status: 201, description: 'Created successfuly' })
    @ApiResponse({ status: 400, description: 'failed to create order' })
    async createOrder(@Body() createOrderDto: CreateOrderRequestDto): Promise<CreateOrderResponseDto> {
        return await this.createOrderUseCase.execute(createOrderDto)
    }
    @Get(':user_id')
    @ApiOperation({ summary: 'Get Order By User ID' })
    @ApiResponse({ status: 200, description: 'Orders from specific user' })
    async getOrderByUserId(@Param('user_id') user_id: string): Promise<OrderResponseDto[]> {
        return await this.getOrderByUserIdUseCase.executeByUserId(user_id)
    }
}