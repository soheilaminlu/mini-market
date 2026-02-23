import {Entity , PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, OneToMany} from 'typeorm'
import { OrderOrmEntity } from './order.model'
import { ReviewOrmEntity } from './review.model'


@Entity('users')
export class UserOrmEntity {
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

    @OneToMany(() => OrderOrmEntity, (order) => order.user)
    orders:OrderOrmEntity[]

    @OneToMany(() => ReviewOrmEntity , (review) => review.user)
    reviews : ReviewOrmEntity[]
}