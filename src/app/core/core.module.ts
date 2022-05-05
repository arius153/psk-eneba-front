import {NgModule} from '@angular/core';
import {HomeComponent} from './home/home.component';
import {SharedModule} from '../shared/shared.module';
import {LoginComponent} from './login/login.component';
import {NewListingComponent} from './home/components/new-listing/new-listing.component';
import {MatFormFieldModule} from '@angular/material/form-field';

@NgModule({
  declarations: [
    HomeComponent,
    LoginComponent,
    NewListingComponent
  ],
  imports: [
    SharedModule,
    MatFormFieldModule
  ],
  exports: []
})

export class CoreModule {
}
