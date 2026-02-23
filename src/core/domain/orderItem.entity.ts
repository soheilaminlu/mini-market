import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Order } from "./order.entity";
import { Product } from "./product.entity";


@Entity('order_item')

export class OrderItem
{
    @PrimaryGeneratedColumn('uuid')
    id:string

    @Column({type: 'uuid'})
    order_id:string

    @ManyToOne(() => Order , (order) => order.items, {onDelete: 'CASCADE'})
    order:Order

    @Column({type: 'uuid'})
    product_id:string

    @ManyToOne(() => Product , (product) => product.orderItems)
    @JoinColumn({name: 'product_id'})
    product:Product

    @Column()
    quantity:number

    @Column()
    price_snapshot: number
}