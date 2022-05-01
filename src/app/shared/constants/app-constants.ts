import {MatDialogConfig} from '@angular/material/dialog';

export class AppConstants {

  public static readonly VALIDATIONS_PREFIX = 'validation.error.';

  // dialog config
  public static baseDialogConfig(): MatDialogConfig {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.width = '800px';
    dialogConfig.maxHeight = '80vh';
    dialogConfig.panelClass = 'modal-base-panel-class';
    return dialogConfig;
  }
}
