import { Review } from "../domain/Review"

export interface ReviewRepositoryPort {
    save(review: Review): Promise<void>
    findByProductId(productId: string): Promise<Review[]>
}