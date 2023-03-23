import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { User } from '../../model/user';
import { AuthService } from '../../service/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent {
  constructor(private authService: AuthService, private router: Router){ }

  hide: boolean = true;
  error: boolean = false;

  loginForm: FormGroup = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required])
  });

  registerForm: FormGroup = new FormGroup({
    name: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required]),
    password_confirmation: new FormControl('', [Validators.required])
  });

  ngOnInit(): void{ }

  onLogin(): void{
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
        this.router.navigate(['/']);
      },
      (err)=>{
        alert('Ocorreu um erro: ' + err.error.message);
        console.log(err);
      }
    )
  }

  onRegister(): void{
    let user: User = {
      id: 0,
      name: this.registerForm.get('name')?.value,
      email: this.registerForm.get('email')?.value,
      password: this.registerForm.get('password')?.value,
      password_confirmation: this.registerForm.get('password_confirmation')?.value,
      access_token: ''
    };

    this.authService.register(user).subscribe(
      (res)=>{
        alert('Cadastro efetuado!');
        this.router.navigate(['/']);
      },
      (err)=>{
        alert('Ocorreu um erro: ' + err.error.message);
        console.log(err);
      }
    )
  }
}
