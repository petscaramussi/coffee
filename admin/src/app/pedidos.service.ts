import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Pedido } from './models/pedido';

@Injectable({
  providedIn: 'root'
})
export class PedidosService {

  baseUrl = 'https://localhost:5001/api/products/order';

  constructor(private http: HttpClient) { }

  getOrders() {
    return this.http.get<Pedido[]>(this.baseUrl);
  }
  
}
