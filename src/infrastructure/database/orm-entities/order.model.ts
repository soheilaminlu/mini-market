import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { OrderItemOrmEntity } from "./orderItem.model";
import { UserOrmEntity } from "./user.model";


@Entity('orders')
export class OrderOrmEntity {
    @PrimaryGeneratedColumn('uuid')
    id:string

     @Column({ type: 'decimal', precision: 10, scale: 2 })
    total_price:number
    
    @OneToMany(() => OrderItemOrmEntity , (orderItem) => orderItem.order)
    items: OrderItemOrmEntity[]

     @Column({type: 'uuid' , name: 'user_id'})
     user_id:string

     @CreateDateColumn()
     createdAt:Date
     
     @UpdateDateColumn()
     updatedAt:Date
     
    @ManyToOne(() => UserOrmEntity , (user) => user.orders)
    @JoinColumn({name:'user_id'})
    user:UserOrmEntity
}
