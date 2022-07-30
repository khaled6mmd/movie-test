import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit, OnDestroy {
  public responseMsg: any;
  private subscriptions: Subscription[] = [];
  constructor(private authService : AuthService) { }

  ngOnInit(): void {
  }
  public onSubmit(value: {name: string, email: string, password: string}) {
    this.subscriptions.push(
    this.authService.signUp(value).subscribe(
      res => {
        this.responseMsg = res.message
        this.authService.storeToken(res.token)
      }))
  }
  ngOnDestroy() {
    this.subscriptions.forEach(s => s.unsubscribe())
  }
}
