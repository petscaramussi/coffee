import { Component, OnInit } from '@angular/core';
import { ProductService } from '../services/product.service';
import { Product } from '../models/product';
import { HttpClient } from '@angular/common/http';
import { itemTypes } from '../models/itemType';

@Component({
  selector: 'app-options',
  templateUrl: './options.component.html',
  styleUrls: ['./options.component.css']
})
export class OptionsComponent implements OnInit{
    products: Product[] = [];
    types: itemTypes[] = [];

    constructor(private productService: ProductService) {

    }

    ngOnInit(): void {

      // get all products
      this.productService.getProducts().subscribe({
        next: response => {this.products = response; console.log(this.products);},
        error: error => console.log(error)
      });

      // get all types
      this.productService.getTypes().subscribe({
        next: response => {this.types = response; console.log(this.types);},
        error: error => console.log(error)
      })
    }

    filterProducts(itemId: number) {
      this.productService.getProductByType(itemId).subscribe({
        next: response => {this.products = response; console.log(response)}
      })
    }




}
