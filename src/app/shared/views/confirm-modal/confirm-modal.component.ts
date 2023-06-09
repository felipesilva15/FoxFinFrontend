import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-confirm-modal',
  templateUrl: './confirm-modal.component.html',
  styleUrls: ['./confirm-modal.component.scss']
})
export class ConfirmModalComponent {
  title: string = ''
  message: string = '';

  constructor(private dialogRef: MatDialogRef<ConfirmModalComponent>, @Inject(MAT_DIALOG_DATA) data: any) {
    this.title = data.title;
    this.message = data.message;
  }
}
