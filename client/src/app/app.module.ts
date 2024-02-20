import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HttpClient } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HeaderComponent } from './header/header.component';

import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { OptionsComponent } from './options/options.component';
import { CartComponent } from './cart/cart.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatRippleModule } from '@angular/material/core';
import { ModalAddCartComponent } from './modal-add-cart/modal-add-cart.component';
import {MatDialogModule, } from '@angular/material/dialog';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatButtonModule} from '@angular/material/button';
import { LoginOrContinueComponent } from './login-or-continue/login-or-continue.component';
import { SemLoginComponent } from './sem-login/sem-login.component';
import { LoginComponent } from './login/login.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxMaskModule } from 'ngx-mask';
import { TextInputComponent } from './components/text-input/text-input.component';
import { FinalComponent } from './final/final.component';


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    OptionsComponent,
    CartComponent,
    ModalAddCartComponent,
    LoginOrContinueComponent,
    SemLoginComponent,
    LoginComponent,
    TextInputComponent,
    FinalComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatSidenavModule,
    MatIconModule,
    HttpClientModule,
    MatToolbarModule,
    MatRippleModule,
    MatDialogModule,
    MatFormFieldModule,
    MatButtonModule,
    FormsModule,
    ReactiveFormsModule,
    NgxMaskModule.forRoot(),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
