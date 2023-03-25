import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MessageModalComponent } from '../views/message-modal/message-modal.component';

@Injectable({
  providedIn: 'root'
})
export class MessageModalService {

  constructor(private dialog: MatDialog) { }

  showDialog(message: string, title?: string): void{
    this.dialog.open(MessageModalComponent, {
      autoFocus: true,
      disableClose: true,
      minWidth: '350px',
      data: {
        title: title && title != '' ? title : 'Atenção',
        message: message
      }
    });
  }
}
