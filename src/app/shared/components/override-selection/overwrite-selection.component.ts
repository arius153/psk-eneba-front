import {Component} from '@angular/core';
import {MatDialogRef} from '@angular/material/dialog';

@Component({
  selector: 'app-override-selection',
  templateUrl: './overwrite-selection.component.html',
  styleUrls: ['./overwrite-selection.component.scss']
})
export class OverwriteSelectionComponent {

  constructor(
    public dialogRef: MatDialogRef<OverwriteSelectionComponent>
  ) {
  }

  override(): void {
    this.dialogRef.close(true);
  }

}
