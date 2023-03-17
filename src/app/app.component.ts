import { Component } from '@angular/core';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  constructor(){
    console.log(environment.production);
    console.log(environment.apiUrl);
  }

  title = 'FoxFinFrontend';
}
