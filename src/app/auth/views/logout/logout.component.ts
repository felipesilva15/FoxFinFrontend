import { AuthService } from './../../service/auth.service';
import { Component } from '@angular/core';

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.scss']
})
export class LogoutComponent {
  constructor(private authService: AuthService){ }

  logout(){
    this.authService.logout().subscribe(
      (res) => {
        alert(res.message  && res.message != '' ? res.message : 'Ok!');
      },
      (err) => {
        console.error(err);
      }
    )
  }
}
