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
    private readonly itemRepo: Repository<OrderItemOrmEntity>
    constructor(@InjectRepository(OrderOrmEntity) repo: Repository<OrderOrmEntity>,
        @InjectRepository(OrderItemOrmEntity) itemRepo: Repository<OrderItemOrmEntity>) {
        this.repo = repo
        this.itemRepo = itemRepo
    }
    async save(order: Order): Promise<void> {
        try {
            const entity = this.mapToOrm(order)
            await this.repo.save(entity)
            if (entity.items && entity.items.length > 0) {
                for (const item of entity.items) {
                    item.order_id = entity.id,
                        item.order = entity
                }
                await this.itemRepo.save(entity.items)
            }
        } catch (error) {
            throw new InternalServerErrorException(`Failed to save Order Entity: ${error.message}`)
        }
    }
    async getOrdersByUserId(user_id: string): Promise<Order[] | []> {
        try {
            const orders = await this.repo.createQueryBuilder('order')
                .leftJoinAndSelect('order.items', 'items')
                .where('order.user_id = :user_id', { user_id: user_id })
                .orderBy('order.createdAt', 'DESC')
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
        const orderDomainDto = order.toDto()
        orderOrm.id = orderDomainDto.id
        orderOrm.user_id = orderDomainDto.userId
        orderOrm.total_price = order.calculateTotalPrice()
        orderOrm.createdAt = orderDomainDto.created_at

        orderOrm.items = orderDomainDto.items.map(item => {
            const itemOrm = new OrderItemOrmEntity()
            const itemDto = item.toDTO()
            itemOrm.id = itemDto.id
            itemOrm.quantity = itemDto.quantity
            itemOrm.price_snapshot = itemDto.price_snapShot
            itemOrm.product_id = itemDto.product_id
            itemOrm.order_id = itemDto.order_id
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