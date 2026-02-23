import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { Review } from "./review.entity";
import { OrderItem } from "./orderItem.entity";
import { Order } from "./order.entity";


@Entity('products')
export class Product {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    title: string;
    
     @Column({ type: 'decimal', precision: 10, scale: 2 })
    price: number;

    @Column({ type: 'int' })
    stock: number;

    @Column({type:'boolean',  default: 'true' })
    is_active: boolean;

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at:Date

    @OneToMany(() => Review , (review) => review.product)
    reviews:Review[]

    @OneToMany(() => OrderItem , (orderItem) => orderItem.product)
    orderItems:OrderItem[]
}