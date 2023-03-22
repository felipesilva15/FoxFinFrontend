import { Component } from '@angular/core';
import { User } from '../../model/user';
import { AuthService } from '../../service/auth.service';
import { Observable } from 'rxjs';
import { FormGroup, FormControl, Validators } from '@angular/forms'

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  constructor(private authService: AuthService){ }

  hide: boolean = true;

  loginForm: FormGroup = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required])
  });

  user: User = {
    id: 0,
    name: '',
    email: '',
    password: '',
    password_confirmation: '',
    access_token: ''
  };

  ngOnInit() { }

  onLogin(){
    this.authService.login(this.user).subscribe(
      (res)=>{
        alert('Login efetuado!');
      },
      (err)=>{
        alert('Ocorreu um erro: ' + err.error.message);
        console.log(err);
      }
    )
  }
}
