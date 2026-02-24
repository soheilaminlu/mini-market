import { Order } from "../domain/order" 

export interface OrderRepositoryPort {
    save(order: Order) : Promise<void>
    getOrderById(id:string) : Promise<Order | null>
    getOrdersByUserId(id:string) : Promise<Order[] | []>
}