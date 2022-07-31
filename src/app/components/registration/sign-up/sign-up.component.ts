import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit, OnDestroy {
  private subscriptions: Subscription[] = [];
  constructor(private authService : AuthService) { }
  errorMsgs: string[] = [];
  successMsg: string ='';

  ngOnInit(): void {
  }

  public getErrorMsgs(message: any) {
    this.errorMsgs = [];
    for (let key in message) {
      this.errorMsgs.push(message[key][0]);
    }
  }

  public onSubmit(value: {name: string, email: string, password: string}) {
    this.subscriptions.push(
      this.authService.signUp(value).subscribe({
        next: res => {
          if (res.status == 'success') {
            this.authService.storeToken(res.token)
            this.successMsg = res.message
            this.errorMsgs = [];
          } else if (res.status == 'failed') {
            this.getErrorMsgs(res.message)
            this.successMsg = ''
          }
        }
      }))
  }

  ngOnDestroy() {
    this.subscriptions.forEach(s => s.unsubscribe())
  }
}
