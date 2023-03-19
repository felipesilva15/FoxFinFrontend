import { Component } from '@angular/core';
import { User } from '../../model/user';
import { AuthService } from '../../service/auth.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  users: User[] = [];
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

  ngOnInit(){
    // this.authService.list()
    //   .subscribe(dados => this.users = dados);

    //this.authService.login(this.user).subscribe(dados => this.user = dados);

    console.log(this.user);
  }

  login(){
    if(!this.user.email || this.user.email == ''){
      alert('Preencha o e-mail');
    } else if(!this.user.password || this.user.password == ''){
      alert('Preencha a senha');
    }

    this.authService.login(this.user).subscribe(
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
