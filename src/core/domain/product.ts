export type ProductDomainModel = {
    id: string;
    title: string;
    price: number;
    stock: number;
    is_active: boolean;
    created_at: Date;
    updated_at: Date;
}

export type ProductDomainDTO = {
  id: string;
  title: string;
  price: number;
  stock: number;
  is_active: boolean;
  created_at: Date;
  updated_at: Date;
};

export class Product {
     readonly props: ProductDomainModel
    constructor(props: ProductDomainModel) {
        this.props = {...props}
    }
    calculateScore(averageRating: number, reviewCounts: number): number {
        const date_since_creation = (Date.now() - this.props.created_at.getTime()) / (1000 * 60 * 60 * 24)
        const score = (averageRating + Math.log(reviewCounts + 1)) / (date_since_creation + 1)
        return score
    }
    isAvailable(): boolean {
        return this.props.is_active && this.props.stock > 0
    }
    activate(): void {
        this.props.is_active = true
    }
    deactive(): void {
        this.props.is_active = false
    }
    decreaseStock(quantity: number): boolean {
        if (quantity > this.props.stock) {
            return false
        }
        this.props.stock -= quantity
        return true
    }
    increaseStcok(quantity: number): void {
        this.props.stock += quantity
    }
    getId(): string {
        return this.props.id
    }
    toDTO(): ProductDomainDTO {
    return { ...this.props };
  }
} 