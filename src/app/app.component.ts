import { Component } from '@angular/core';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  mostrarMenu: boolean = true;

  constructor() {}

  ngOnInit() {
    this.mostrarMenu = window.location.pathname.substring(1).split('/')[0] == 'auth' ? false : true
  }
}
