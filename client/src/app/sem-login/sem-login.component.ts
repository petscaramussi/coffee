import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { CartItem } from '../models/cartItem';
import { PedidoService } from '../services/pedido.service';

@Component({
  selector: 'app-sem-login',
  templateUrl: './sem-login.component.html',
  styleUrls: ['./sem-login.component.css']
})
export class SemLoginComponent {

  pedido: CartItem = {
    name: null,
    address: null,
    tel: null,
    addressComplement: null,
    payment: null,
    Items: [
      {productId: 0, qtde: 0},
      {productId: 0, qtde: 0}
    ]
  };

  constructor(private pedidoService: PedidoService) {}
  
  loginForm = new FormGroup({
    name: new FormControl('', Validators.required),
    tel: new FormControl('', Validators.required),
    address: new FormControl('', Validators.required),
    complement: new FormControl('', Validators.required),
    payment: new FormControl('', Validators.required),
  });

  onSubmit() {
    this.pedido = {
      name: this.loginForm.value.name,
      address: this.loginForm.value.address,
      tel: this.loginForm.value.tel,
      addressComplement: this.loginForm.value.complement,
      payment: this.loginForm.value.payment,
      Items: [
        {productId: 1, qtde: 2},
        {productId: 2, qtde: 4}
      ]
    }

    console.log(this.pedido);

    this.pedidoService.setOrder(this.pedido);
  }
}
