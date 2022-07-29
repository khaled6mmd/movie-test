import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }

  signUp(newUser: { name: string, email: string, password: string }) {    
    return this.http.post<any>('https://test-api.storexweb.com/api/register', newUser)
  }

  logIn(user: { email: string, password: string }) {
    return this.http.post<any>('https://test-api.storexweb.com/api/login', user)
  }

  storeToken(token: string) {
    localStorage.setItem('moviesToken', token)
  }

  isloggedIn() {
    return !!localStorage.getItem('moviesToken')
  }
}
