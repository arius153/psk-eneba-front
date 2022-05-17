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
import {SafeHtmlPipe} from './pipes/safe-html.pipe';
import {MAT_DATE_LOCALE, MatNativeDateModule} from '@angular/material/core';
import {MatInputModule} from '@angular/material/input';
import {ToastrModule} from 'ngx-toastr';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {TopMenuComponent} from './components/top-menu/top-menu.component';

@NgModule({
    declarations: [
        FormGroupComponent,
        ImageUploaderComponent,
        WeekdaySelectorComponent,
        SafeHtmlPipe,
        TopMenuComponent
    ],
  imports: [
    CommonModule,
    FormsModule,
    TranslateModule,
    ModalModule,
    MatDialogModule,
    MatIconModule,
    MatNativeDateModule,
    MatInputModule,
    GoogleMapsModule,
    MatDatepickerModule,
    MatFormFieldModule,
    RouterModule,
    ToastrModule.forRoot(),
    BrowserAnimationsModule
  ],
    exports: [
        CommonModule,
        TranslateModule,
        FormsModule,
        FormGroupComponent,
        MatDialogModule,
        ImageUploaderComponent,
        MatIconModule,
        MatNativeDateModule,
        MatInputModule,
        GoogleMapsModule,
        MatDatepickerModule,
        WeekdaySelectorComponent,
        MatFormFieldModule,
        RouterModule,
        SafeHtmlPipe,
        BrowserAnimationsModule,
        TopMenuComponent
    ],
  providers: [
    {provide: MAT_DATE_LOCALE, useValue: 'en-GB'}
  ]
})
export class SharedModule {
}
