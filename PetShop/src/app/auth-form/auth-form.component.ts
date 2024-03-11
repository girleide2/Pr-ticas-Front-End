import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-auth-form',
  templateUrl: './auth-form.component.html',
  styleUrls: ['./auth-form.component.css']
})
export class AuthFormComponent implements OnInit {
  email: string = '';
  password: string = '';
  conta: boolean = false;

  constructor(private authService: AuthService) { }

  ngOnInit(): void {
  }

  toggleSignUp(): void {
    this.conta = !this.conta;
  }

  async onSubmit(): Promise<void> {
    if (this.conta) {
      await this.authService.signUp(this.email, this.password);
    } else {
      await this.authService.login(this.email, this.password);
    }
  }
}
