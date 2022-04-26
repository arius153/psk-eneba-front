import {NgForm} from '@angular/forms';

export class FormUtils {
  public static handleFormErrors(form: NgForm, controlKey: string, errorKey: string): void {
    if (form.control.get(controlKey) && errorKey) {
      const obj = {};
      obj[errorKey] = true;
      form.control.get(controlKey).setErrors(obj);
    }
  }
}
