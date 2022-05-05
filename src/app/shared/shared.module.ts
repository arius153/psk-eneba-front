import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {TranslateModule} from '@ngx-translate/core';
import {ModalModule} from 'ngx-bootstrap/modal';
import {FormGroupComponent} from './components/from-group/form-group.component';
import {MatDialogModule} from '@angular/material/dialog';
import {ImageUploaderComponent} from './components/image-uploader/image-uploader.component';
import {MatIconModule} from '@angular/material/icon';
import {GooglePlaceModule} from 'ngx-google-places-autocomplete';
import {GoogleMapsModule} from '@angular/google-maps';
import {MatDatepickerModule} from '@angular/material/datepicker';
import { WeekdaySelectorComponent } from './components/weekday-selector/weekday-selector.component';

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
    GooglePlaceModule,
    GoogleMapsModule,
    MatDatepickerModule
  ],
  exports: [
    CommonModule,
    TranslateModule,
    FormsModule,
    FormGroupComponent,
    MatDialogModule,
    ImageUploaderComponent,
    MatIconModule,
    GooglePlaceModule,
    GoogleMapsModule,
    MatDatepickerModule,
    WeekdaySelectorComponent
  ]
})
export class SharedModule {
}
