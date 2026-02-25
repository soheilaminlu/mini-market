import { Order } from "./order"
import { Product } from "./product"

export type OrderItemDomainModel = {
  id:string
  order_id:string
  product_id:string,
  price_snapShot:number
  quantity:number
}


export class OrderItem {
  private readonly props : OrderItemDomainModel
  constructor(props: OrderItemDomainModel) {
    this.props = props
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

   getId() : string {
    return this.props.id
  }
  getProductId() : string {
    return this.props.product_id
  }
  getPriceSnapShot() : number {
    return this.props.price_snapShot
  }
  getQuantity() : number {
    return this.props.quantity;
  }

}