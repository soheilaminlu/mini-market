import { BadRequestException, Inject, Injectable, InternalServerErrorException } from "@nestjs/common";
import { Order } from "src/core/domain/order";
import { OrderItem } from "src/core/domain/orderItem";
import { Product } from "src/core/domain/product";
import { ORDER_REPOSITORY, type OrderRepositoryPort } from "src/core/ports/order.port";
import { PRODUCT_REPOSITORY, type ProductRepositoryPorts } from "src/core/ports/product.port";
import { CreateOrderRequestDto, CreateOrderResponseDto} from "src/presentation/dtos/order.dto";



@Injectable()
export class CreateOrderUseCase {
    private readonly orderRepo: OrderRepositoryPort
    private readonly productRepo: ProductRepositoryPorts
    constructor(@Inject(ORDER_REPOSITORY) orderRepo: OrderRepositoryPort, @Inject(PRODUCT_REPOSITORY) productRepo: ProductRepositoryPorts) {
        this.orderRepo = orderRepo
        this.productRepo = productRepo
    }
    async execute(input: CreateOrderRequestDto): Promise<CreateOrderResponseDto> {
        try {
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
                const productDomainDto = productDomain.toDTO()
                if (!productDomain.isAvailable()) {
                    throw new BadRequestException(`Product ${productData.title} is not available`)
                }
                if (!productDomain.decreaseStock(itemDto.quantity)) {
                    throw new BadRequestException(`Not enough stock for product product ${productData.title}`)
                }
                const orderItem = new OrderItem({
                    id: crypto.randomUUID(),
                    order_id: '',
                    price_snapShot: productDomainDto.price,
                    product_id: productDomainDto.id,
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
            const orderDomainDto = order.toDto()
            for (const item of selectedItems) {
                (item as any).props.order_id = order.toDto().id;
            }
            order.calculateTotalPrice()
            await this.orderRepo.save(order)
            const response: CreateOrderResponseDto = {
                items: selectedItems.map(item => ({
                    product_id: item.toDTO().product_id,
                    quantity: item.toDTO().quantity,
                    price_snapShot: item.toDTO().price_snapShot
                })),
                totalPrice: order.calculateTotalPrice(),
                createdAt: new Date(),
                user_id: orderDomainDto.userId
            }
            return response
        } catch (error) {
            throw new InternalServerErrorException(`Error When Create Order ${error.message}`)
        }
    }
}