import { Injectable } from '@angular/core';
import { CartItem } from '../models/cartItem';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class PedidoService {

  baseUrl = 'https://localhost:5001/api/products/';

  constructor(private http: HttpClient) {}

  setOrder(cart: CartItem) {
    return this.http.post<string>(this.baseUrl + 'order', cart).subscribe({
      next: response => {
        console.log(response);
      }
    })
  }

}
