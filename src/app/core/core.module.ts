import {NgModule} from '@angular/core';
import {SharedModule} from '../shared/shared.module';
import {LoginComponent} from './login/login.component';
import {GoogleMapsModule} from '@angular/google-maps';
import {NewListingComponent} from './home/components/new-listing/new-listing.component';
import {HomeComponent} from './home/home.component';
import { RatingComponent } from './home/components/rating/rating.component';
import {RatingModule} from 'ngx-bootstrap/rating';

@NgModule({
  declarations: [
    HomeComponent,
    LoginComponent,
    NewListingComponent,
    RatingComponent
  ],
    imports: [
        SharedModule,
        GoogleMapsModule,
        RatingModule,
    ],
  exports: []
})

export class CoreModule {
}
