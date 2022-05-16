import {Component, Inject, OnInit} from '@angular/core';
import {UserReviewsResponse} from '../../shared/models/user-reviews-response';
import {UserReviewService} from '../../shared/services/user-review.service';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {ToolService} from '../../shared/services/tool.service';
import {MyListingBrief} from '../../shared/models/my-listing-brief';
import {Router} from '@angular/router';
import {UserService} from '../../shared/services/user.service';
import {UserFull} from '../../shared/models/user-full';

@Component({
  selector: 'app-user-info',
  templateUrl: './user-info.component.html',
  styleUrls: ['./user-info.component.scss']
})
export class UserInfoComponent implements OnInit {

  userReviews: UserReviewsResponse[];
  userListings: MyListingBrief[];
  user: UserFull;

  constructor(private userReviewService: UserReviewService,
              private toolService: ToolService,
              @Inject(MAT_DIALOG_DATA) public data: any,
              private dialogRef: MatDialogRef<UserInfoComponent>,
              private router: Router,
              private userService: UserService) {
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
  }

  ngOnInit(): void {
    if (this.data.userId) {
      this.userReviewService.getUserReviewsById(this.data.userId).subscribe(result => {
        this.userReviews = result;
      });
      this.toolService.getToolListByUserId(this.data.userId).subscribe(result => {
        this.userListings = result;
      });
      this.userService.getUserById(this.data.userId).subscribe(result => {
        this.user = result;
      });
    } else {
      this.dialogRef.close();
    }
  }

  openTool(id: number): void {
    this.router.navigateByUrl('/tool/' + id).then(() => {
      this.dialogRef.close();
    });
  }
}
