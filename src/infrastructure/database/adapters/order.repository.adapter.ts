import { Injectable, InternalServerErrorException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Order, OrderItem } from "src/core/domain/order";
import { OrderRepositoryPort } from "src/core/ports/order.port";
import { Repository } from "typeorm";
import { OrderOrmEntity } from "../orm-entities/order.model";

@Injectable()
export class OrderRepositoryAdapter implements OrderRepositoryPort {
    private readonly repo: Repository<OrderOrmEntity>
    constructor(@InjectRepository(OrderOrmEntity) repo: Repository<OrderOrmEntity>) {
        this.repo = repo
    }
    async getOrderWithItems(id: string): Promise<OrderItem[] | []> {
       const order = await 
    }
    async save(order: Order): Promise<void> {
        try {
            const entity = this.maptoOrm(order)
            await this.repo.save(entity)
        } catch (error) {
            throw new InternalServerErrorException(`Failed to save Order Entity: ${error.message}`)
        }
    }
    async getOrderById(id: string): Promise<Order | null> {
        try {
            const order = await this.repo.findOne({ where: { id } })
            if (order == null) {
                return null
            }
            return order;
        } catch (error) {
            throw new InternalServerErrorException(`Failed to find Order Entity by id: ${error.message}`)
        }
    }
    async getOrdersByUserId(user_id: string): Promise<Order[] | []> {
        try {
            const orders = await this.repo.find({
                where: { user_id: user_id },
                order: { createdAt: 'DESC' }
            })
            return orders
        } catch (error) {
           throw new InternalServerErrorException(`Failed to find orders by userid: ${error.message}`)
        }
    }
    private maptoOrm(order: Order) : OrderOrmEntity {
        const orderOrm = new OrderOrmEntity();
        return orderOrm
    }
}