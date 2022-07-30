import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-log-in',
  templateUrl: './log-in.component.html',
  styleUrls: ['./log-in.component.css']
})
export class LogInComponent implements OnInit {
  errorMessage: boolean = false

  constructor(private authService : AuthService, private router: Router) {}

  ngOnInit() {
  }

  onSubmit(value: {email: string, password: string}) {
    this.errorMessage = false
     this.authService.logIn(value).subscribe({
      next: res => {    
         this.authService.storeToken(res.authorisation.token)
         this.router.navigate(['/home']);
       },
       error: err => {
        this.errorMessage = true;
       }})
  }
} 
