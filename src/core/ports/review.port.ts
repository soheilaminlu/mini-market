import { Review } from "../domain/review" 

export interface ReviewRepositoryPort {
    save(review: Review): Promise<void>
    getAllReviewsByProductId(productId: string): Promise<Review[]>
    getAllReviewsFromUser(id:string) : Promise<Review[]>
}