import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-sem-login',
  templateUrl: './sem-login.component.html',
  styleUrls: ['./sem-login.component.css']
})
export class SemLoginComponent {
  
  loginForm = new FormGroup({
    name: new FormControl('', Validators.required),
    tel: new FormControl('', Validators.required),
    address: new FormControl('', Validators.required),
    complement: new FormControl('', Validators.required),
    payment: new FormControl('', Validators.required)
  });

  onSubmit() {
    console.log(this.loginForm);
  }
}
