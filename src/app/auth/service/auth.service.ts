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

  constructor(private http: HttpClient) { }

  list(){
    return this.http.get<User[]>(`${this.urlApi}/login`)
      .pipe(
        tap(console.log)
      );
  }

  login(user: any){
    return this.http.post<User>(`${this.urlApi}/login`, user)
      .pipe(
        delay(200),
        tap(console.log)
      );
  }

  register(user: User){
    return this.http.post<User>(`${this.urlApi}/register`, user)
      .pipe(
        delay(200),
        tap(console.log)
      );
  }
}
