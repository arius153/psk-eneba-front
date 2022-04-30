import {Component, ElementRef, Input, OnInit, Optional, ViewChild} from '@angular/core';
import {AbstractControl, FormGroup, NgForm} from '@angular/forms';
import {TranslateService} from '@ngx-translate/core';
import {ObjectUtils} from '../../utils/object-utils';
import {AppConstants} from '../../constants/app-constants';

@Component({
  selector: 'app-form-group',
  templateUrl: './form-group.component.html',
  styleUrls: ['./form-group.component.scss']
})

export class FormGroupComponent implements OnInit {

  @ViewChild('counterTarget')
  input: ElementRef<HTMLInputElement>;

  @Input() label: string;
  @Input() required: boolean;
  @Input() form: NgForm;
  @Input() controlId: string;
  @Input() hideLabel: boolean;
  @Input() displayCounter: boolean;
  @Input() counter: number;
  @Input() displayTrumbowygWarning: boolean;
  @Input() displayTouched: boolean;
  @Input() displayPresent: boolean;
  @Input()
  wasSubmitted: boolean;
  // @ts-ignore
  @Input() displayHelp: boolean;
  @Input() helpLabel: string;
  @Input() helpLabelPosition = 'below';
  @Input() errorCssClass = '';
  @Input() errorBlockCssClass = 'help-block';
  @Input() validateInnerFormGroup: boolean;
  @Input() labelLeft: boolean;

  constructor(private translateService: TranslateService,
              @Optional() private parentForm: NgForm) {
  }

  ngOnInit(): void {
    this.form = this.parentForm && !this.form ? this.parentForm : this.form;
    document.querySelectorAll(`input[name="${this.controlId}"]`).forEach(htmlElement => {
      htmlElement.setAttribute('autocomplete', 'off');
    });
    if (ObjectUtils.isNullOrUndefined(this.label)) {
      this.hideLabel = true;
    }
  }

  getControl(): AbstractControl {
    if (this.form) {
      if (this.validateInnerFormGroup) {
        const controls: Record<string, any> = {};
        Object.keys(this.form.controls).forEach(key => {
          const control = this.form.controls[key];
          if (control instanceof FormGroup) {
            this.getControls(control, controls);
          } else {
            controls[key] = this.form.controls[key];
          }
        });
        return controls[this.controlId];
      }
      return this.form.controls[this.controlId];
    }
  }

  getControls(formGroup: FormGroup, controls: Record<string, any>): void {
    Object.keys(formGroup.controls).forEach(key => {
      const control = formGroup.controls[key];
      if (control instanceof FormGroup) {
        this.getControls(control, controls);
      } else {
        controls[key] = formGroup.controls[key];
      }
    });
  }

  getErrorLabel(): string {
    const control = this.getControl();
    if (this.form && control) {
      const keys = Object.keys(control.errors);
      const values = Object.values(control.errors);
      const mappedErrorLabels = keys.map(label => this.translateService.instant(AppConstants.VALIDATIONS_PREFIX + label, values[keys.indexOf(label)]));
      return mappedErrorLabels.join('\r\n');
    }
    return '';
  }

  hasControlError(): boolean {
    const control = this.getControl();
    if (this.wasSubmitted === false) {
      return false;
    }
    return (control && control.errors) && (control.dirty || control.touched || this.form.submitted);
  }

  hasError(): boolean {
    return this.form.submitted && this.hasControlError();
  }

  invalidTouched(): boolean {
    const control = this.getControl();
    return control && this.displayTouched && control.touched && control.invalid;
  }

  invalidPresent(): boolean {
    const control = this.getControl();
    return control && this.displayPresent && control.invalid;
  }

}
