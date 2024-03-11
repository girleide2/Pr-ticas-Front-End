import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private loggedInUserSubject = new BehaviorSubject<boolean>(false);
  loggedInUser$ = this.loggedInUserSubject.asObservable();

  constructor() { }

  private authenticate(email: string, password: string): boolean {

    const isAuthenticated = true;

    if (isAuthenticated) {
      this.loggedInUserSubject.next(true);
    }

    return isAuthenticated;
  }

  login(email: string, password: string): void {
    if (this.authenticate(email, password)) {
      console.log('Login bem-sucedido');
    } else {
      console.log('Falha no login');
    }
  }

  signUp(email: string, password: string): void {
    const isSignUpSuccessful = true;

    if (isSignUpSuccessful) {
      this.authenticate(email, password);
      console.log('Cadastro bem-sucedido');
    } else {
      console.log('Falha no cadastro');
    }
  }
}
