import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient, private router: Router) { }

  public signUp(newUser: { name: string, email: string, password: string }) {    
    return this.http.post<any>('https://test-api.storexweb.com/api/register', newUser)
  }

  public logIn(user: { email: string, password: string }): Observable<any>  {
    return this.http.post<any>('https://test-api.storexweb.com/api/login', user)
  }

  public storeToken(token: string): void  {
    localStorage.setItem('moviesToken', token)
  }

  public isloggedIn(): boolean  {
    return !!localStorage.getItem('moviesToken')
  }

  public logOut(): void  {
    localStorage.removeItem('moviesToken')
    this.router.navigate(['/login'])
  }
}
