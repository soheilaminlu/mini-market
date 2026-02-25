import { Order } from "./order"
import { Product } from "./product"

export type OrderItemDomainModel = {
  id:string
  order_id:string
  order:Order
  product_id:string,
  product:Product
  price_snapShot:number
  quantity:number
}


export class OrderItem {
  private readonly props : OrderItemDomainModel
  constructor(props: OrderItemDomainModel) {
    this.props = props
  }
  getId() : string {
    return this.props.id
  }
  addQuantity(newQuantity:number) {
    if(newQuantity <= 0) {
     throw new Error("Invalid Quantity")
    }
    this.props.quantity += newQuantity
  }
   getTotalPrice() : number {
    return this.props.quantity * this.props.price_snapShot
  }

}