import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { ReviewOrmEntity } from "../orm-entities/review.model";
import { ReviewRepositoryPort } from "src/core/ports/review.port";
import { Review } from "src/core/domain/review";
import { InternalServerErrorException } from "@nestjs/common";

export class ReviewRepositoryAdapter implements ReviewRepositoryPort {
    private readonly repo: Repository<ReviewOrmEntity>
    constructor(@InjectRepository(ReviewOrmEntity) repo: Repository<ReviewOrmEntity>) {
        this.repo = repo
    }
    async save(review: Review): Promise<void> {
        try {
            const reviewEntity = this.mapToOrm(review)
            await this.repo.save(reviewEntity)
        } catch (error) {
            throw new InternalServerErrorException(`failed to save review ${error.message}`);
        }
    }
    async getAllReviewsByProductId(product_id: string): Promise<Review[] | []> {
        try {
            const reviewsByProductId = await this.repo.find({ where: { product_id: product_id } })
            return reviewsByProductId.map(r => this.mapToDomain(r))
        } catch (error) {
            throw new InternalServerErrorException(`failed to get all reviews ${error.message}`);
        }
    }
    async getAllReviewsFromUser(user_id: string): Promise<Review[] | []> {
        try {
            const reviewOrms = await this.repo.createQueryBuilder('review')
                .where('review.user_id = :user_id', { user_id })
                .orderBy('review.createdAt', 'DESC')
                .getMany()

            if (!reviewOrms.length) return []
            return reviewOrms.map(r => this.mapToDomain(r))

        } catch (error) {
            throw new InternalServerErrorException(`Failed to get all reviews for user: ${error.message}`)
        }
    }
    private mapToOrm(review: Review): ReviewOrmEntity {
        const reviewOrm = new ReviewOrmEntity()
        const reviewDomainDto = review.toDto()
        reviewOrm.id = reviewDomainDto.id
        reviewOrm.rating = reviewDomainDto.rating
        reviewOrm.user_id = reviewDomainDto.userId
        reviewOrm.product_id = reviewDomainDto.productId
        reviewOrm.comment = reviewDomainDto.comment
        reviewOrm.createdAt = reviewDomainDto.createdAt
        return reviewOrm
    }

    private mapToDomain(reviewOrm: ReviewOrmEntity): Review {
        return new Review({
            id: reviewOrm.id,
            rating: reviewOrm.rating,
            userId: reviewOrm.user_id,
            productId: reviewOrm.product_id,
            comment: reviewOrm.comment,
            createdAt: reviewOrm.createdAt,
        })
    }
}