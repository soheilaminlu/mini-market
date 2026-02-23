import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import {Min , Max} from 'class-validator'
import { User } from "./user.entity";
import { Product } from "./product.entity";


@Entity('reviews')
export class Review {

    @PrimaryGeneratedColumn('uuid')
    id: string

    @Column()
    @Min(1, { message: 'min rate is 1' })
    @Max(5, { message: 'max rate is 5' })
    rating: number

    @Column({ type: 'uuid' , name: 'user_id' })
    user_id: string

    @ManyToOne(() => User, (user) => user.reviews)
    @JoinColumn({name: 'user_id'})
    user: User

    @Column({type:'uuid' , name:'product_id'})
    product_id: string

    @ManyToOne(() => Product, (product) => product.reviews)
    @JoinColumn({name:'product_id'})
    product: Product
}