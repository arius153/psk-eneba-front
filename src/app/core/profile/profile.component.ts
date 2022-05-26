import {Component, OnInit, QueryList, ViewChild, ViewChildren} from '@angular/core';
import {ProfileSideButtonComponent} from './components/profile-side-button/profile-side-button.component';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  constructor() { }

  @ViewChild('profile_my_listings') myListingsButton: ProfileSideButtonComponent;
  @ViewChild('profile_account') accountButton: ProfileSideButtonComponent;
  @ViewChild('profile_my_reviews') myReviewsButton: ProfileSideButtonComponent;
  @ViewChild('profile_borrowed_tools_history') borrowedToolsHistoryButton: ProfileSideButtonComponent;
  @ViewChild('profile_currently_rented') currentlyRentedButton: ProfileSideButtonComponent;
  @ViewChildren(ProfileSideButtonComponent) sideButtons: QueryList<ProfileSideButtonComponent>;

  showMyListings = true;
  showAccount = false;
  showMyReviews = false;
  showBorrowHistory = false;
  showCurrentlyRented = false;

  myListingsSelected(): void {
    this.hideAll();
    this.deselectAllExcept(this.myListingsButton);
    this.showMyListings = true;
  }

  accountSelected(): void {
    this.hideAll();
    this.deselectAllExcept(this.accountButton);
    this.showAccount = true;
  }

  myReviewsSelected(): void {
    this.hideAll();
    this.deselectAllExcept(this.myReviewsButton);
    this.showMyReviews = true;
  }

  borrowedToolsHistorySelected(): void {
    this.hideAll();
    this.deselectAllExcept(this.borrowedToolsHistoryButton);
    this.showBorrowHistory = true;
  }

  currentlyRentedSelected(): void {
    this.hideAll();
    this.deselectAllExcept(this.currentlyRentedButton);
    this.showCurrentlyRented = true;
  }

  hideAll(): void {
    this.showMyListings = false;
    this.showAccount = false;
    this.showMyReviews = false;
    this.showBorrowHistory = false;
    this.showMyReviews = false;
    this.showCurrentlyRented = false;
  }

  deselectAllExcept(exceptButton: ProfileSideButtonComponent): void {
    this.sideButtons.forEach((button) => {
      if (button !== exceptButton) {
        button.deselect();
      }
    });
  }

  ngOnInit(): void {
  }
}
