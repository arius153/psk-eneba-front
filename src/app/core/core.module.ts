import {NgModule} from '@angular/core';
import {HomeComponent} from './home/home.component';
import {SharedModule} from '../shared/shared.module';
import {LoginComponent} from './login/login.component';
import {GoogleMapsModule} from '@angular/google-maps';
import { NewListingComponent } from './home/components/new-listing/new-listing.component';
import { ProfileComponent } from './profile/profile.component';
import { ProfileSideButtonComponent } from './profile/components/profile-side-button/profile-side-button.component';
import { MyListingsComponent } from './profile/components/my-listings/my-listings.component';
import { MyReviewsComponent } from './profile/components/my-reviews/my-reviews.component';
import { AccountPageComponent } from './profile/components/account-page/account-page.component';
import { MyListingsItemComponent } from './profile/components/my-listings-item/my-listings-item.component';
import { RatingComponent } from './home/components/rating/rating.component';
import {RatingModule} from 'ngx-bootstrap/rating';
import {RouterModule} from '@angular/router';
import { ToolComponent } from './tool/tool.component';
import { BorrowHistoryComponent } from './profile/components/borrow-history/borrow-history.component';
import { UserInfoComponent } from './user-info/user-info.component';

@NgModule({
  declarations: [
    HomeComponent,
    LoginComponent,
    NewListingComponent,
    RatingComponent,
    ProfileComponent,
    ProfileSideButtonComponent,
    MyListingsComponent,
    MyReviewsComponent,
    AccountPageComponent,
    MyListingsItemComponent,
    ToolComponent,
    BorrowHistoryComponent,
    UserInfoComponent
  ],
  imports: [
    SharedModule,
    GoogleMapsModule,
    RatingModule,
    RouterModule,
  ],
  exports: []
})

export class CoreModule {
}
