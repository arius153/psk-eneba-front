import {NgModule} from '@angular/core';
import {SharedModule} from '../shared/shared.module';
import {LoginComponent} from './login/login.component';
import {GoogleMapsModule} from '@angular/google-maps';
import {IgxButtonModule, IgxToggleModule} from 'igniteui-angular';
import {NewListingComponent} from './home/components/new-listing/new-listing.component';
import {HomeComponent} from './home/home.component';

@NgModule({
  declarations: [
    HomeComponent,
    LoginComponent,
    NewListingComponent
  ],
  imports: [
    SharedModule,
    GoogleMapsModule,
    IgxButtonModule,
    IgxToggleModule,
  ],
  exports: []
})

export class CoreModule {
}
