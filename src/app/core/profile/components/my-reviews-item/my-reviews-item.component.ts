import {Component, Input, OnInit} from '@angular/core';
import {UserReviewsResponse} from '../../../../shared/models/user-reviews-response';
import {UserReviewService} from '../../../../shared/services/user-review.service';

@Component({
  selector: 'app-my-reviews-item',
  templateUrl: './my-reviews-item.component.html',
  styleUrls: ['./my-reviews-item.component.scss']
})
export class MyReviewsItemComponent implements OnInit {

  constructor(private userReviewService: UserReviewService
  ) { }

  @Input() review: UserReviewsResponse;

  replyOpen = false;

  ngOnInit(): void {
  }

  showAddReply(): void {
    this.replyOpen = true;
  }

  hideAddReply(): void {
    this.replyOpen = false;
  }

  addReply(userReview): void {
    this.userReviewService.addReply(userReview.id, userReview.answer).subscribe(result => {
      userReview.answers.push(result);
      userReview.answer = '';
    });
  }

}
