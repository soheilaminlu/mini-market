import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import {Min , Max} from 'class-validator'
import { UserOrmEntity } from "../user.model";
import { ProductOrmEntity } from "./product.model";


@Entity('reviews')
export class ReviewOrmEntity {

    @PrimaryGeneratedColumn('uuid')
    id: string

    @Column()
    @Min(1, { message: 'min rate is 1' })
    @Max(5, { message: 'max rate is 5' })
    rating: number

    @Column({ type: 'uuid' , name: 'user_id' })
    user_id: string

    @ManyToOne(() => UserOrmEntity, (user) => user.reviews)
    @JoinColumn({name: 'user_id'})
    user: UserOrmEntity

    @Column({type:'uuid' , name:'product_id'})
    product_id: string

    @ManyToOne(() => ProductOrmEntity, (product) => product.reviews)
    @JoinColumn({name:'product_id'})
    product: ProductOrmEntity
}