import { Order } from "src/core/domain/order"
import { OrderItem } from "src/core/domain/orderItem"

export class CreateOrderItemResponseDto {
    product_id: string
    quantity: number
    price_snapShot: number
}

export class CreateOrderResponseDto {
    user_id: string
    createdAt: Date
    totalPrice: number
    items: CreateOrderItemResponseDto[]
}

export class CreateOrderRequestDto {
    user_id: string
    items: CreateOrderItemDto[]
}
export class CreateOrderItemDto {
    product_id: string
    quantity: number
}

export class OrderItemResponseDto {
  product_id: string
  quantity: number
  price_snapshot: number
}

export class OrderResponseDto {
  id: string
  createdAt: Date
  total_price: number
  items: OrderItemResponseDto[]
  user_id: string
}