import {UserReviewAnswerResponse} from './user-review-answer-response';

export class UserReviewsResponse {
  id: number;
  rating: number;
  comments: string;
  reviewedBy: string;
  reviewedAt: Date;
  answers: UserReviewAnswerResponse[];
  answer: string;
}
