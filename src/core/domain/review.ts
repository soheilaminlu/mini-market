export class ReviewDomainModel {
    id: string;
    productId: string;
    userId: string;
    rating: number;
    comment: string;
    createdAt: Date;
}

export class Review {
    private readonly props: ReviewDomainModel
    constructor(props: ReviewDomainModel) {
        this.props = props
    }
    validateRaitng(rate: number): boolean {
        if (rate < 1 || rate > 5) {
            return false;
        }
        return true
    }
    getProductId(): string {
        return this.props.productId
    }

    getUserId(): string {
        return this.props.userId
    }

    getRating(): number {
        return this.props.rating
    }

    getComment(): string {
        return this.props.comment
    }

    getId(): string {
        return this.props.id
    }

    getCreatedAt(): Date {
        return this.props.createdAt
    }
}