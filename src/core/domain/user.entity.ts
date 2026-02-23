import {Entity, Unique , PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, OneToMany, ManyToOne} from 'typeorm'
import { Order } from './order.entity'
import { Review } from './review.entity'


@Entity('users')
export class User {
    @PrimaryGeneratedColumn('uuid')
    id: string

    @Column({ unique: true })
    email: string

    @Column()
    username: string

    @Column()
    password: string

    @CreateDateColumn()
    createdAt: Date

    @UpdateDateColumn()
    updatedAt: Date

    @OneToMany(() => Order, (order) => order.user)
    orders:Order[]

    @OneToMany(() => Review , (review) => review.user)
    reviews : Review[]
}