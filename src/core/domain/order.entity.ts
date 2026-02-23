import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { OrderItem } from "./orderItem.entity";
import { User } from "./user.entity";


@Entity('orders')
export class Order {
    @PrimaryGeneratedColumn('uuid')
    id:string

     @Column({ type: 'decimal', precision: 10, scale: 2 })
    total_price:number
    
    @OneToMany(() => OrderItem , (orderItem) => orderItem.order)
    items: OrderItem[]

     @Column({type: 'uuid' , name: 'user_id'})
     user_id:string

     @CreateDateColumn()
     createdAt:Date
     
     @UpdateDateColumn()
     updatedAt:Date
     
    @ManyToOne(() => User , (user) => user.orders)
    @JoinColumn({name:'user_id'})
    user:User
}
