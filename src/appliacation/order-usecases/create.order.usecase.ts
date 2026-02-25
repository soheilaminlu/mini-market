import { BadRequestException, Injectable } from "@nestjs/common";
import { Order } from "src/core/domain/order";
import { OrderItem } from "src/core/domain/orderItem";
import { Product } from "src/core/domain/product";
import type { OrderRepositoryPort } from "src/core/ports/order.port";
import type { ProductRepositoryPorts } from "src/core/ports/product.port";
import { CreateOrderDto, CreateOrderItemDto } from "src/presentation/dtos/order.dto";



@Injectable()
export class CreateOrderUseCase {
    private readonly orderRepo: OrderRepositoryPort
    private readonly productRepo: ProductRepositoryPorts
    constructor(orderRepo: OrderRepositoryPort, productRepo: ProductRepositoryPorts) {
        this.orderRepo = orderRepo
        this.productRepo = productRepo
    }
    async execute(input: CreateOrderDto) {
        const selectedItems: OrderItem[] = []
        for (const itemDto of input.items) {
            const productData = await this.productRepo.getProductById(itemDto.product_id)
            if (!productData) {
                throw new BadRequestException(`product ${itemDto.product_id} not found`)
            }
            const productDomain = new Product({
                id: productData.id,
                title: productData.title,
                created_at: productData.created_at,
                is_active: productData.is_active,
                price: productData.price,
                stock: productData.stock,
                updated_at: productData.created_at
            })
            if (!productDomain.isAvailable()) {
                throw new BadRequestException(`Product ${productData.title} is not available`)
            }
            if (!productDomain.decreaseStock(itemDto.quantity)) {
                throw new BadRequestException(`Not enough stock for product product ${productData.title}`)
            }
            const orderItem = new OrderItem({
                id: crypto.randomUUID(),
                order_id: '',
                price_snapShot: productDomain.getPrice(),
                product_id: productDomain.getId(),
                quantity: itemDto.quantity
            })
            selectedItems.push(orderItem)
            productDomain.decreaseStock(itemDto.quantity)
            await this.productRepo.save(productDomain)
        }
        const order = new Order({
            id: crypto.randomUUID(),
            items: selectedItems,
            created_at: new Date(),
            userId: input.user_id,
            total_price: 0
        })
        for (const item of selectedItems) {
            ; (item as any).props.order = order
                ; (item as any).props.order_id = order.getId()
        }
        order.calculateTotalPrice()
        await this.orderRepo.save(order)
        return order
    }
}