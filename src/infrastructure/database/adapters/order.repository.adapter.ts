import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Order } from "src/core/domain/order";
import { OrderRepositoryPort } from "src/core/ports/order.port";
import { Repository } from "typeorm";
import { OrderOrmEntity } from "../orm-entities/order.model";

@Injectable()
export class OrderRepositoryAdapter implements OrderRepositoryPort {
    private readonly repo: Repository<OrderOrmEntity>
    constructor(@InjectRepository(OrderOrmEntity) repo: Repository<OrderOrmEntity>) {
        this.repo = repo
    }
    async save(order: Order): Promise<void> {
        try {
            const entity = this.maptoOrm(order)
            await this.repo.save(entity)
        } catch (error) {
            throw new Error("Failed to save Order Entity", { cause: error })
        }
    }
    async getOrderById(id: string): Promise<Order | null> {
        throw new Error("Method not implemented.");
    }
    async getOrdersByUserId(id: string): Promise<Order[] | []> {
        throw new Error("Method not implemented.");
    }

    private maptoOrm(order: Order) : OrderOrmEntity {
        const orderOrm = new OrderOrmEntity();
        return orderOrm
    }
}