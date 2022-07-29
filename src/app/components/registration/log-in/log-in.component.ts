import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-log-in',
  templateUrl: './log-in.component.html',
  styleUrls: ['./log-in.component.css']
})
export class LogInComponent implements OnInit {

  constructor(private authService : AuthService) {}

  ngOnInit() {
  }

  onSubmit(value: any) {
     this.authService.logIn(value).subscribe(
       res => {
        console.log(res);
        
         this.authService.storeToken(res.token)
       })
  }
}
