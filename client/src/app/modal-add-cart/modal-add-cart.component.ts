import { Component, Inject } from '@angular/core';
import {
  MatDialog,
  MAT_DIALOG_DATA,
  MatDialogRef,
} from '@angular/material/dialog';
import { DialogData } from '../options/options.component';

@Component({
  selector: 'app-modal-add-cart',
  templateUrl: './modal-add-cart.component.html',
  styleUrls: ['./modal-add-cart.component.css']
})
export class ModalAddCartComponent {
  constructor(
    public dialogRef: MatDialogRef<ModalAddCartComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
  ) {}

  onNoClick(): void {
    this.dialogRef.close();
  }

  onPlusQtde() {
    this.data.qtde++;
  }

  onSubQtde() {
    if ( this.data.qtde >= 2)
      this.data.qtde--;
  }
}
