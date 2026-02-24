import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { ReviewOrmEntity } from "./review.model";
import { OrderItemOrmEntity } from "./orderItem.model";
import { OrderOrmEntity } from "./order.model";


@Entity('products')
export class ProductOrmEntity {
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

    @OneToMany(() => ReviewOrmEntity , (review) => review.product)
    reviews:ReviewOrmEntity[]

    @OneToMany(() => OrderItemOrmEntity , (orderItem) => orderItem.product)
    orderItems:OrderItemOrmEntity[]
}