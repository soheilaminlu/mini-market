export class CreateReviewDto {
    user_id:string
    rating:number
    comment:string
}


export class ReviewResponseDto {
    id: string;
    productId: string;
    userId: string;
    rating: number;
    comment: string;
    createdAt: Date;
}