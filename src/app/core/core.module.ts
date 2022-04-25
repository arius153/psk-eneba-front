import {NgModule} from '@angular/core';
import {HomeComponent} from './home/home.component';
import {SharedModule} from '../shared/shared.module';
import {TranslateModule} from '@ngx-translate/core';
import {LoginComponent} from './login/login.component';
import {GoogleMapsModule} from '@angular/google-maps';

@NgModule({
  declarations: [
    HomeComponent,
    LoginComponent
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
