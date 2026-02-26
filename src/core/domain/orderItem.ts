import { Order } from "./order"
import { Product } from "./product"

export type OrderItemDomainModel = {
  id:string
  order_id:string
  product_id:string,
  price_snapShot:number
  quantity:number
}

export type OrderItemDomainDto = {
  id:string
  order_id:string
  product_id:string,
  price_snapShot:number
  quantity:number
}

export class OrderItem {
  private readonly props : OrderItemDomainModel
  constructor(props: OrderItemDomainModel) {
    this.props = {...props}
  }
  addQuantity(newQuantity:number) {
    if(newQuantity <= 0) {
     throw new Error("Invalid Quantity")
    }
    this.props.quantity += newQuantity
  }
   toDTO() : OrderItemDomainDto {
    return {...this.props}
   }
    getTotalPrice() : number {
    return this.props.quantity * this.props.price_snapShot
  }

}