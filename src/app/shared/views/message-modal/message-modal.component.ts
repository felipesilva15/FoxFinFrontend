import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-message-modal',
  templateUrl: './message-modal.component.html',
  styleUrls: ['./message-modal.component.scss']
})
export class MessageModalComponent {
  title: string = ''
  message: string = '';

  constructor(private dialogRef: MatDialogRef<MessageModalComponent>, @Inject(MAT_DIALOG_DATA) data: any) {
    this.title = data.title;
    this.message = data.message;
  }
}
