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

@NgModule({
  declarations: [
    FormGroupComponent,
    ImageUploaderComponent,
    WeekdaySelectorComponent
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
    MatFormFieldModule
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
    MatFormFieldModule
  ]
})
export class SharedModule {
}
