import { Component } from '@angular/core';
import { User } from '../../model/user';
import { AuthService } from '../../service/auth.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {
  user: User = {
    id: 0,
    name: '',
    email: '',
    password: '',
    password_confirmation: '',
    access_token: ''
  };

  user$: Observable<User> = new Observable();

  constructor(private authService: AuthService){ }

  ngOnInit(){ }

  register(){
    this.authService.register(this.user).subscribe(
      (data)=>{
        this.user = data;
      },
      (err)=>{
        alert('Ocorreu um erro: ' + err.error.message);
        console.log(err);
      }
    )

    //this.user$ = this.authService.login(this.user);
  }
}
