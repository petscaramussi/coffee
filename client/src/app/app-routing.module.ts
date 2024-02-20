import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { OptionsComponent } from './options/options.component';
import { CartComponent } from './cart/cart.component';
import { LoginOrContinueComponent } from './login-or-continue/login-or-continue.component';
import { LoginComponent } from './login/login.component';
import { SemLoginComponent } from './sem-login/sem-login.component';
import { FinalComponent } from './final/final.component';

const routes: Routes = [
  {path: '', redirectTo: '/produtos', pathMatch: 'full'},
  {path: 'produtos', component: OptionsComponent},
  {path: 'carrinho', component: CartComponent},
  {path: 'carrinho/login-or-continue', component: LoginOrContinueComponent},
  {path: 'carrinho/login', component: LoginComponent},
  {path: 'carrinho/sem-login', component: SemLoginComponent},
  {path: 'final', component: FinalComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
