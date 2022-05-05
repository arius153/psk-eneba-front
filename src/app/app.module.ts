import {APP_INITIALIZER, NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {HTTP_INTERCEPTORS, HttpClient, HttpClientJsonpModule, HttpClientModule} from '@angular/common/http';
import {TranslateLoader, TranslateModule} from '@ngx-translate/core';
import {TranslateHttpLoader} from '@ngx-translate/http-loader';
import {AppConfigService, initializeAppConfig} from './shared/services/app-config.service';
import {CoreModule} from './core/core.module';
import {SharedModule} from './shared/shared.module';
import {JwtInterceptor} from './shared/interceptors/jwt.interceptor';
import {GoogleMapsModule} from '@angular/google-maps';
import {NoopAnimationsModule} from '@angular/platform-browser/animations';
import {FormsModule} from '@angular/forms';
import {GooglePlaceModule} from 'ngx-google-places-autocomplete';
import {MatNativeDateModule} from '@angular/material/core';


export function createTranslateLoader(http: HttpClient): TranslateHttpLoader {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    CoreModule,
    SharedModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: createTranslateLoader,
        deps: [HttpClient]
      },
      defaultLanguage: 'en'
    }),
    GoogleMapsModule,
    HttpClientJsonpModule,
    NoopAnimationsModule,
    FormsModule,
    GooglePlaceModule,
    MatNativeDateModule
  ],
  providers: [
    {provide: APP_INITIALIZER, useFactory: initializeAppConfig, deps: [AppConfigService], multi: true},
    {provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true}
  ],
  bootstrap: [AppComponent]
})

export class AppModule {
}
