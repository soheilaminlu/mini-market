import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { OrderOrmEntity } from "./order.model";
import { ProductOrmEntity } from "../product.model";


@Entity('order_item')

export class OrderItemOrmEntity
{
    @PrimaryGeneratedColumn('uuid')
    id:string

    @Column({type: 'uuid'})
    order_id:string

    @ManyToOne(() => OrderOrmEntity , (order) => order.items, {onDelete: 'CASCADE'})
    order:OrderOrmEntity

    @Column({type: 'uuid'})
    product_id:string

    @ManyToOne(() => ProductOrmEntity , (product) => product.orderItems)
    @JoinColumn({name: 'product_id'})
    product:ProductOrmEntity

    @Column()
    quantity:number

    @Column()
    price_snapshot: number
}