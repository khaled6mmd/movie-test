import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {
  responseMsg: any;
  constructor(private authService : AuthService) { }

  ngOnInit(): void {
  }
  onSubmit(value: any) {
    this.authService.signUp(value).subscribe(
      res => {
        this.responseMsg = res.message
        this.authService.storeToken(res.token)
      })  
  }

}
