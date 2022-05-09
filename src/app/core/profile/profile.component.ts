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
  @ViewChild('profile_my_locations') myLocationsButton: ProfileSideButtonComponent;
  @ViewChild('profile_account') accountButton: ProfileSideButtonComponent;
  @ViewChild('profile_my_reviews') myReviewsButton: ProfileSideButtonComponent;
  @ViewChild('profile_site_settings') siteSettingsButton: ProfileSideButtonComponent;
  @ViewChild('profile_help') helpButton: ProfileSideButtonComponent;
  @ViewChildren(ProfileSideButtonComponent) sideButtons: QueryList<ProfileSideButtonComponent>;

  // AAAAAAAAAAAAA cia toks garbage code bet @ViewChild yra gaidys ir negaliu normaliai daryt
  showMyListings = true;
  showMyLocations = false;
  showAccount = false;
  showMyReviews = false;
  showSiteSettings = false;
  showHelp = false;

  myListingsSelected(): void
  {
    this.hideAll();
    this.deselectAllExcept(this.myListingsButton);
    this.showMyListings = true;
  }

  myLocationsSelected(): void
  {
    this.hideAll();
    this.deselectAllExcept(this.myLocationsButton);
    this.showMyLocations = true;
  }

  accountSelected(): void
  {
    this.hideAll();
    this.deselectAllExcept(this.accountButton);
    this.showAccount = true;
  }

  myReviewsSelected(): void
  {
    this.hideAll();
    this.deselectAllExcept(this.myReviewsButton);
    this.showMyReviews = true;
  }

  siteSettingsSelected(): void
  {
    this.hideAll();
    this.deselectAllExcept(this.siteSettingsButton);
    this.showSiteSettings = true;
  }

  helpSelected(): void
  {
    this.hideAll();
    this.deselectAllExcept(this.helpButton);
    this.showHelp = true;
  }

  hideAll(): void {
    this.showMyListings = false;
    this.showMyLocations = false;
    this.showAccount = false;
    this.showSiteSettings = false;
    this.showHelp = false;
  }

  deselectAllExcept(exceptButton: ProfileSideButtonComponent): void
  {
    this.sideButtons.forEach((button) => {
      if (button !== exceptButton) {
        button.deselect();
      }
    });
  }

  ngOnInit(): void {
  }
}
