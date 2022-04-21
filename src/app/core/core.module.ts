import {NgModule} from '@angular/core';
import {HomeComponent} from './home/home.component';
import {SharedModule} from '../shared/shared.module';
import {TranslateModule} from '@ngx-translate/core';

@NgModule({
  declarations: [HomeComponent],
  imports: [
    SharedModule,
    TranslateModule
  ],
  exports: []
})

export class CoreModule {
}
