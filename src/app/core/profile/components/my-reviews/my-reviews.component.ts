import {Component, Input, OnInit} from '@angular/core';
import {Observable} from 'rxjs';
import {ToolResponse} from '../../../../shared/models/tool-response';
import {AppConfigService} from '../../../../shared/services/app-config.service';
import {UserReviewService} from '../../../../shared/services/user-review.service';
import {CategoryResponse} from '../../../../shared/models/category-response';
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

}
