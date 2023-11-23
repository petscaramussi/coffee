import { HttpClient } from '@angular/common/http';
import { Injectable, Type } from '@angular/core';
import { Product } from '../models/product';
import { ItemType } from '../models/itemType';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  baseUrl = 'https://localhost:5001/api/';
    
  constructor(private http: HttpClient) { }

  getProducts() {
    return this.http.get<Product[]>(this.baseUrl + 'products');
  }

  getProductByType(itemId: number) {
    return this.http.get<Product[]>(this.baseUrl + 'products?TypeId=' + itemId);
  }

  getTypes() {
    return this.http.get<ItemType[]>(this.baseUrl + 'products/types');
  }
}
