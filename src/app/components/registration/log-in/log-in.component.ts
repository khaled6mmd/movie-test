import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-log-in',
  templateUrl: './log-in.component.html',
  styleUrls: ['./log-in.component.css']
})
export class LogInComponent implements OnInit, OnDestroy {
  public errorMessage: boolean = false
  private subscriptions: Subscription[] = [];

  constructor(private authService : AuthService, private router: Router) {}

  ngOnInit() {
  }

  public onSubmit(value: {email: string, password: string}) {
    this.errorMessage = false
    this.subscriptions.push(
     this.authService.logIn(value).subscribe({
      next: res => {    
         this.authService.storeToken(res.authorisation.token)
         this.router.navigate(['/home']);
       },
       error: err => {
        this.errorMessage = true;
       }}))
  }
  ngOnDestroy() {
    this.subscriptions.forEach(s => s.unsubscribe())
  }
} 
