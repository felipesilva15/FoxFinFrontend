import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { User } from '../../model/user';
import { AuthService } from '../../service/auth.service';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { MessageModalComponent } from 'src/app/shared/views/message-modal/message-modal.component';
import { ConfirmModalComponent } from 'src/app/shared/views/confirm-modal/confirm-modal.component';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent {
  constructor(private authService: AuthService, private router: Router, private dialog: MatDialog){ }

  // Create forms
  loginForm!: FormGroup;
  registerForm!: FormGroup;

  ngOnInit(): void{
    // Login form
    this.loginForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required])
    });

    // Register form
    this.registerForm = new FormGroup({
      name: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required]),
      password_confirmation: new FormControl('', [Validators.required])
    });
  }

  // gets Login
  get emailLogin() {
    return this.loginForm.get('email')!;
  }

  get passwordLogin() {
    return this.loginForm.get('password')!;
  }

  // gets Register
  get nameRegister() {
    return this.registerForm.get('name')!;
  }

  get emailRegister() {
    return this.registerForm.get('email')!;
  }

  get passwordRegister() {
    return this.registerForm.get('password')!;
  }

  get passwordConfRegister() {
    return this.registerForm.get('password_confirmation')!;
  }

  // Submit form Login
  onLogin(): void{
    if(this.loginForm.invalid){
      return;
    }

    let user: User = {
      id: 0,
      name: '',
      email: this.emailLogin.value,
      password: this.passwordLogin.value,
      password_confirmation: '',
      access_token: ''
    };

    this.authService.login(user).subscribe(
      (res)=>{
        alert('Login efetuado!');
        this.router.navigate(['/']);
      },
      (err)=>{
        this.openDialog(err.error.message);
        console.log(err);
      }
    )
  }

  // Submit form Register
  onRegister(): void{
    if(this.registerForm.invalid){
      return;
    }

    let user: User = {
      id: 0,
      name: this.nameRegister.value,
      email: this.emailRegister.value,
      password: this.passwordRegister.value,
      password_confirmation: this.passwordConfRegister.value,
      access_token: ''
    };

    this.authService.register(user).subscribe(
      (res)=>{
        alert('Cadastro efetuado!');
        this.router.navigate(['/']);
      },
      (err)=>{
        this.openDialog(err.error.message);
        console.log(err);
      }
    )
  }

  openDialog(message: string): void{
    this.dialog.open(ConfirmModalComponent, {
      autoFocus: true,
      disableClose: true,
      minWidth: '400px',
      data: {
        title: 'Erro inesperado',
        message: message
      }
    });
  }
}
