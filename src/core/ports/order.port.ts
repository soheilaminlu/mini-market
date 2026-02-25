import { promises } from "dns"
import { Order } from "../domain/order" 
import { OrderItem } from "../domain/orderItem"

export const ORDER_REPOSITORY = Symbol('ORDER_REPOSITORY')

export interface OrderRepositoryPort {
    save(order: Order) : Promise<void>
    getOrderById(id:string) : Promise<Order | null>
    getOrdersByUserId(id:string) : Promise<Order[] | []>
    getOrderWithItems(id:string) : Promise<OrderItem[] | []>
}

