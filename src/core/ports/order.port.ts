import { promises } from "dns"
import { Order } from "../domain/order" 
import { OrderItem } from "../domain/orderItem"

export const ORDER_REPOSITORY = Symbol('ORDER_REPOSITORY')

export interface OrderRepositoryPort {
    save(order: Order) : Promise<void>
    getOrdersByUserId(user_id:string) : Promise<Order[] | []>
}

