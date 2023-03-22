import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { User } from '../../model/user';
import { AuthService } from '../../service/auth.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent {
  constructor(private authService: AuthService){ }

  hide: boolean = true;
  error: boolean = false;

  loginForm: FormGroup = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required])
  });

  ngOnInit() { }

  onLogin(){
    let user: User = {
      id: 0,
      name: '',
      email: this.loginForm.get('email')?.value,
      password: this.loginForm.get('password')?.value,
      password_confirmation: '',
      access_token: ''
    };

    this.authService.login(user).subscribe(
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
