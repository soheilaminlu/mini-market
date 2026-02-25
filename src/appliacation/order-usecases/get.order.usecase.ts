import { InternalServerErrorException, NotFoundException } from "@nestjs/common"
import { OrderRepositoryPort } from "src/core/ports/order.port"
import { ProductRepositoryPorts } from "src/core/ports/product.port"
import { UserRepositoryPort } from "src/core/ports/user.port"




export class GetOrderUseCases {
    private readonly orderRepo: OrderRepositoryPort
    private readonly userRepo: UserRepositoryPort
    constructor(orderRepo: OrderRepositoryPort, userRepo: UserRepositoryPort) {
        this.orderRepo = orderRepo
        this.userRepo = userRepo
    }
    async executeByUserId(userId: string) {
        try {
            const orders = await this.orderRepo.getOrdersByUserId(userId)
            if (!orders) {
                return null;
            }
            return orders;
        } catch (error) {
            throw new InternalServerErrorException(`Failed to find Orders of this user ${error.message}`)
        }
    }
    async executeById(orderId: string) {
        try {
            const order = await this.orderRepo.getOrderById(orderId)
            if (order == null) {
                return null
            }
            return order;

        } catch (error) {
            throw new InternalServerErrorException(`Failed to find Order with this Id ${error.message}`)
        }
    }
}