import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { environment } from 'src/environments/environment';
import { User } from '../model/user';
import { tap, delay } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private readonly urlApi = environment.apiUrl;
  private readonly tokenName = 'user_auth';

  constructor(private http: HttpClient) { }

  // retorna o cookie de autenticação
  get token(): string{
    return this.getCookie(this.tokenName);
  }

  // Cria um cookie
  private setCookie(cookieName: string, value: string, expireDays: number): void{
    let dateNow:Date = new Date();
    dateNow.setTime(dateNow.getTime() + expireDays * 24 * 60 * 60 * 1000);

    let expires:string = `expires=${dateNow.toUTCString()}`;

    document.cookie = `${cookieName}=${value}; ${expires}`;
  }

  // Deleta um cookie
  private deleteCookie(cookieName: string): void{
    this.setCookie(cookieName, '', -1);
  }

  // Obtém o valor de um cookie
  private getCookie(cookieName: string) {
    let ca: Array<string> = document.cookie.split(';');
    let caLen: number = ca.length;
    let cookieFullName = `${cookieName}=`;
    let c: string;

    for (let i: number = 0; i < caLen; i += 1) {
      c = ca[i].replace(/^\s+/g, '');
      if (c.indexOf(cookieFullName) == 0) {
        return c.substring(cookieFullName.length, c.length);
      }
    }

    return '';
  }

  list(){
    return this.http.get<User[]>(`${this.urlApi}/login`)
      .pipe(
        tap(console.log)
      );
  }

  login(user: any){
    return this.http.post<User>(`${this.urlApi}/login`, user)
      .pipe(
        tap((res: any) => {
          this.setCookie(this.tokenName, res.access_token, 1);
        })
      );
  }

  register(user: User){
    return this.http.post<User>(`${this.urlApi}/register`, user)
      .pipe(
        tap((res: any) => {
          this.setCookie(this.tokenName, res.access_token, 1);
        })
      );
  }

  logout(){
    return this.http.get(`${this.urlApi}/logout`)
      .pipe(
        tap((res: any) => {
          this.deleteCookie(this.tokenName);
        })
      );
  }
}
