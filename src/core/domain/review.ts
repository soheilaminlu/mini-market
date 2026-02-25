export class ReviewDomainModel {
  id: string;
  productId: string;
  userId: string;
  rating: number;
  comment: string;
  createdAt: Date;
  updatedAt: Date;
}

export class Review {
private readonly props : ReviewDomainModel 
constructor(props:ReviewDomainModel) {
    this.props = props
}
validateRaitng(rate:number) : boolean {
    if(rate < 1 || rate > 5) {
        return false;
    }
    return true
}

}