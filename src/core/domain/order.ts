import { OrderItem } from "./orderItem"

export type OrderDomainModel = {
    id: string
    userId: string
    items: OrderItem[]
    total_price: number
    created_at: Date
}

export type OrderDtoDomain = {
    id: string
    userId: string
    items: OrderItem[]
    total_price: number
    created_at: Date
}

export class Order {
    private readonly props : OrderDomainModel
    constructor(props: OrderDomainModel) {
        this.props = {...props}
    }

    calculateTotalPrice() : number {
       return this.props.total_price = this.props.items.reduce((sum , i) => sum + i.getTotalPrice(), 0)
    }

    addItem(item:OrderItem) {
        this.props.items.push(item)
        this.calculateTotalPrice()
    }
    deleteItem(item_id:string) {
        this.props.items = this.props.items.filter(i => i.toDTO().id !== item_id)
        this.calculateTotalPrice()
    }
    toDto() : OrderDtoDomain {
        return {...this.props}
    }
}
