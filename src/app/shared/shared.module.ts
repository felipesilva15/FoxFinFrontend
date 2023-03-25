import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDialogModule } from '@angular/material/dialog';
import { MessageModalComponent } from './views/message-modal/message-modal.component';
import { MatButtonModule } from '@angular/material/button';
import { ConfirmModalComponent } from './views/confirm-modal/confirm-modal.component';



@NgModule({
  declarations: [
    MessageModalComponent,
    ConfirmModalComponent
  ],
  imports: [
    CommonModule,
    MatDialogModule,
    MatButtonModule
  ],
  entryComponents: [
    MessageModalComponent, 
    ConfirmModalComponent
  ]
})
export class SharedModule {
  static forRoot(): any[] | import("@angular/core").Type<any> | import("@angular/core").ModuleWithProviders<{}> {
    throw new Error('Method not implemented.');
  }
}
