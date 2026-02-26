import { Inject, Injectable, InternalServerErrorException, NotFoundException } from "@nestjs/common"
import { Order } from "src/core/domain/order"
import { OrderItem } from "src/core/domain/orderItem"
import { ORDER_REPOSITORY, type OrderRepositoryPort } from "src/core/ports/order.port"
import { USER_REPOSITORY, type UserRepositoryPort } from "src/core/ports/user.port"
import { OrderItemResponseDto, OrderResponseDto } from "src/presentation/dtos/order.dto"



@Injectable()
export class GetOrderByUserIdUseCases {
    private readonly orderRepo: OrderRepositoryPort
    private readonly userRepo: UserRepositoryPort
    constructor(@Inject(ORDER_REPOSITORY) orderRepo: OrderRepositoryPort, @Inject(USER_REPOSITORY) userRepo: UserRepositoryPort) {
        this.orderRepo = orderRepo
        this.userRepo = userRepo
    }
    async executeByUserId(userId: string): Promise<OrderResponseDto[]> {
        const orders = await this.orderRepo.getOrdersByUserId(userId)
        if (!orders) {
            throw new NotFoundException("Not Found Any orders for this user")
        }
        return orders.map(o => this.mapToResponseDto(o))
    }
    private mapToResponseDto(order: Order): OrderResponseDto {
        const orderDto = order.toDto()
        const itemMap = orderDto.items.map(o => this.mapToOrderItemResponseDto(o))
        return {
            createdAt: orderDto.created_at,
            items: itemMap,
            total_price: order.calculateTotalPrice(),
            user_id: orderDto.userId,
            id: orderDto.id
        }
    }
    private mapToOrderItemResponseDto(orderItem: OrderItem): OrderItemResponseDto {
        const dto = orderItem.toDTO()
        return {
            price_snapshot: dto.price_snapShot,
            quantity: dto.quantity,
            product_id: dto.product_id
        }
    }
}