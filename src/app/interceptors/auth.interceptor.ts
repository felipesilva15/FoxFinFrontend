import { AuthService } from './../auth/service/auth.service';
import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Router } from '@angular/router';
import { MessageModalService } from '../shared/services/message-modal.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(
    private authService: AuthService,
    private router: Router,
    private messageModalService: MessageModalService) {

  }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    if(this.authService.token && this.authService.token != ''){
      request = request.clone({
        setHeaders: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${this.authService.token}`
        }
      });
    }

    return next.handle(request).pipe(
      tap(
        () => {},
        (err: any) => {
          console.error(err);

          if (err instanceof HttpErrorResponse) {
            if (err.status == 401) {
              this.router.navigate(['/auth']);
            } else{
              this.messageModalService.showDialog(err.error.message);
            }
          }
        }
      )
    );
  }
}
