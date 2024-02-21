import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  loginForm = new FormGroup({
    tel: new FormControl('', Validators.required),
    pass: new FormControl('', Validators.required)
  });

  onSubmit() {
    console.log(this.loginForm);
  }
}
