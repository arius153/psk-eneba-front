import {NgModule} from '@angular/core';
import {HomeComponent} from './home/home.component';
import {SharedModule} from '../shared/shared.module';
import {TranslateModule} from '@ngx-translate/core';
import {LoginComponent} from './login/login.component';
import {GoogleMapsModule} from '@angular/google-maps';
import { NewListingComponent } from './home/components/new-listing/new-listing.component';
import { ProfileComponent } from './profile/profile.component';
import { ProfileSideButtonComponent } from './profile/components/profile-side-button/profile-side-button.component';
import { MyListingsComponent } from './profile/components/my-listings/my-listings.component';
import { MyLocationsComponent } from './profile/components/my-locations/my-locations.component';
import { MyReviewsComponent } from './profile/components/my-reviews/my-reviews.component';
import { AccountPageComponent } from './profile/components/account-page/account-page.component';
import { SiteSettingsComponent } from './profile/components/site-settings/site-settings.component';
import { HelpPageComponent } from './profile/components/help-page/help-page.component';

@NgModule({
  declarations: [
    HomeComponent,
    LoginComponent,
    NewListingComponent,
    ProfileComponent,
    ProfileSideButtonComponent,
    MyListingsComponent,
    MyLocationsComponent,
    MyReviewsComponent,
    AccountPageComponent,
    SiteSettingsComponent,
    HelpPageComponent
  ],
    imports: [
        SharedModule,
        TranslateModule,
        GoogleMapsModule
    ],
  exports: []
})

export class CoreModule {
}
