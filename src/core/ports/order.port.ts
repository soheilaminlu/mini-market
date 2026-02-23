import { Order } from "../domain/Order" 

export interface OrderRepositoryPort {
    save(order: Order) : Promise<void>
    createOrder() : Promise<boolean>
}