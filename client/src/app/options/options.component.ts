import { Component, OnInit } from '@angular/core';
import { ProductService } from '../services/product.service';
import { Product } from '../models/product';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-options',
  templateUrl: './options.component.html',
  styleUrls: ['./options.component.css']
})
export class OptionsComponent implements OnInit{
    products: Product[] = [];

    constructor(private productService: ProductService) {

    }

    ngOnInit(): void {
      this.productService.getProducts().subscribe({
        next: response => {this.products = response; console.log(this.products);},
        error: error => console.log(error)
      });
    }




}
