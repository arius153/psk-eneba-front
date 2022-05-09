import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {TranslateModule} from '@ngx-translate/core';
import {ModalModule} from 'ngx-bootstrap/modal';
import {FormGroupComponent} from './components/from-group/form-group.component';
import {MatDialogModule} from '@angular/material/dialog';
import {ImageUploaderComponent} from './components/image-uploader/image-uploader.component';
import {MatIconModule} from '@angular/material/icon';
import {GoogleMapsModule} from '@angular/google-maps';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {WeekdaySelectorComponent} from './components/weekday-selector/weekday-selector.component';
import {MatFormFieldModule} from '@angular/material/form-field';
import {RouterModule} from '@angular/router';
import { SafeHtmlPipe } from './pipes/safe-html.pipe';

@NgModule({
  declarations: [
    FormGroupComponent,
    ImageUploaderComponent,
    WeekdaySelectorComponent,
    SafeHtmlPipe
  ],
  imports: [
    CommonModule,
    FormsModule,
    TranslateModule,
    ModalModule,
    MatDialogModule,
    MatIconModule,
    GoogleMapsModule,
    MatDatepickerModule,
    MatFormFieldModule,
    RouterModule,
  ],
  exports: [
    CommonModule,
    TranslateModule,
    FormsModule,
    FormGroupComponent,
    MatDialogModule,
    ImageUploaderComponent,
    MatIconModule,
    GoogleMapsModule,
    MatDatepickerModule,
    WeekdaySelectorComponent,
    MatFormFieldModule,
    RouterModule,
    SafeHtmlPipe
  ]
})
export class SharedModule {
}
