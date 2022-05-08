import {Component, Inject, OnInit} from '@angular/core';
import {RatingRequest} from '../../../../shared/models/rating-request';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {UserReviewService} from '../../../../shared/services/user-review.service';

@Component({
  selector: 'app-rating',
  templateUrl: './rating.component.html',
  styleUrls: ['./rating.component.scss']
})
export class RatingComponent implements OnInit {

  ratingRequest = new RatingRequest();
  max = 5;
  rate = 0;
  isReadonly = false;

  constructor(
    public dialogRef: MatDialogRef<RatingComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private userReviewService: UserReviewService
  ) {
  }

  ngOnInit(): void {
    this.ratingRequest.userToRateId = this.data.userToRateId;
  }

  doRate(): void {
    if (!this.ratingRequest.rating) {
      return;
    }
    this.userReviewService.rateUser(this.ratingRequest).subscribe(() => {
      this.dialogRef.close();
    });
  }
}
