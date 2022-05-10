import {Component, OnInit} from '@angular/core';
import {UserReviewService} from '../../../../shared/services/user-review.service';
import {UserReviewsResponse} from '../../../../shared/models/user-reviews-response';

@Component({
  selector: 'app-my-reviews',
  templateUrl: 'my-reviews.component.html',
  styleUrls: ['my-reviews.component.scss']
})

export class MyReviewsComponent implements OnInit {

  userReviews: UserReviewsResponse[];

  constructor(private userReviewService: UserReviewService) {
  }

  ngOnInit(): void {
    this.userReviewService.getUserReviews().subscribe(result => {
      this.userReviews = result;
    });
  }

  addReply(userReview): void {
    this.userReviewService.addReply(userReview.id, userReview.answer).subscribe(result => {
      userReview.answers.push(result);
      userReview.answer = '';
    });
  }
}
