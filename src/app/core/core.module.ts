import {NgModule} from '@angular/core';
import {HomeComponent} from './home/home.component';
import {SharedModule} from '../shared/shared.module';
import {TranslateModule} from '@ngx-translate/core';
import {LoginComponent} from './login/login.component';
import {GoogleMapsModule} from '@angular/google-maps';
import { NewListingComponent } from './home/components/new-listing/new-listing.component';

@NgModule({
  declarations: [
    HomeComponent,
    LoginComponent,
    NewListingComponent
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
