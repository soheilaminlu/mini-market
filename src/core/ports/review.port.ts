import { Review } from "../domain/review" 

export const REVIEW_REPOSITORY = Symbol('REVIEW_REPOSITORY')

export interface ReviewRepositoryPort {
    save(review: Review): Promise<void>
    getAllReviewsByProductId(productId: string): Promise<Review[] | []>
    getAllReviewsFromUser(id:string) : Promise<Review[] | []>
}

export interface ReviewQueryOptions {
includeProduct?: boolean,
includeUser?: boolean
}
