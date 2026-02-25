

export class CreateOrderDto {
    user_id:string
    items: CreateOrderItemDto[]
}

export class CreateOrderItemDto { 
    product_id:string
    quantity:number
}