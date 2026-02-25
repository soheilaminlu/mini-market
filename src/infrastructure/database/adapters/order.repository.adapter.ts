import { Injectable, InternalServerErrorException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Order } from "src/core/domain/order";
import { OrderRepositoryPort } from "src/core/ports/order.port";
import { Repository } from "typeorm";
import { OrderOrmEntity } from "../orm-entities/order.model";
import { OrderItem } from "src/core/domain/orderItem";
import { OrderItemOrmEntity } from "../orm-entities/orderItem.model";

@Injectable()
export class OrderRepositoryAdapter implements OrderRepositoryPort {
    private readonly repo: Repository<OrderOrmEntity>
    constructor(@InjectRepository(OrderOrmEntity) repo: Repository<OrderOrmEntity>) {
        this.repo = repo
    }
    async save(order: Order): Promise<void> {
        try {
            const entity = this.mapToOrm(order)
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
            return this.mapToDomain(order)
        } catch (error) {
            throw new InternalServerErrorException(`Failed to find Order Entity by id: ${error.message}`)
        }
    }
    async getOrdersByUserId(user_id: string): Promise<Order[] | []> {
        try {
            const orders = await this.repo.createQueryBuilder('order')
                .leftJoinAndSelect('order.items', 'items')
                .where('order.user_id :user_id', { user_id: user_id })
                .orderBy('order.created_at', 'DESC')
                .getMany()
            if (!orders.length) {
                return []
            }
            return orders.map(o => this.mapToDomain(o))
        } catch (error) {
            throw new InternalServerErrorException(`Failed to find orders by userid: ${error.message}`)
        }
    }
    private mapToOrm(order: Order): OrderOrmEntity {
        const orderOrm = new OrderOrmEntity()

        orderOrm.id = order.getId()
        orderOrm.user_id = order.getUserId()
        orderOrm.total_price = order.calculateTotalPrice()
        orderOrm.createdAt = order.getCreatedAt()

        orderOrm.items = order.getItems().map(item => {
            const itemOrm = new OrderItemOrmEntity()

            itemOrm.id = item.getId()
            itemOrm.quantity = item.getQuantity()
            itemOrm.price_snapshot = item.getPriceSnapShot()
            itemOrm.product_id = item.getProductId()
            itemOrm.order = orderOrm

            return itemOrm
        })

        return orderOrm
    }
    private mapToDomain(orderOrm: OrderOrmEntity): Order {
        const items = (orderOrm.items ?? []).map(itemOrm => {
            return new OrderItem({
                id: itemOrm.id,
                order_id: orderOrm.id,
                product_id: itemOrm.product_id,
                price_snapShot: itemOrm.price_snapshot,
                quantity: itemOrm.quantity
            })
        })

        const order = new Order({
            id: orderOrm.id,
            userId: orderOrm.user_id,
            items: items,
            total_price: orderOrm.total_price,
            created_at: orderOrm.createdAt
        })

        return order
    }
}