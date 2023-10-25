import { Component, OnInit } from '@angular/core';
import { ProductService } from '../services/product.service';
import { Product } from '../models/product';
import { itemTypes } from '../models/itemType';

@Component({
  selector: 'app-options',
  templateUrl: './options.component.html',
  styleUrls: ['./options.component.css']
})
export class OptionsComponent implements OnInit {

  products: Product[] = [];
  types: itemTypes[] = [];
  optionSelected: string = "Todos";
  selected: boolean[] = [false, false, false];

  constructor(private productService: ProductService) {

  }

  ngOnInit(): void {

    // get all products
    this.productService.getProducts().subscribe({
      next: response => { this.products = response; console.log(this.products); },
      error: error => console.log(error)
    });

    // get all types
    this.productService.getTypes().subscribe({
      next: response => { this.types = response; console.log(this.types); },
      error: error => console.log(error)
    });



  }

  filterProducts(itemId: number, index: number) {

    this.productService.getProductByType(itemId).subscribe({
      next: response => {
        this.products = response; console.log(response);

        this.optionSelected = this.types.filter(function (itm) {
          return itemId == itm.id
        })[0].name; console.log(this.optionSelected)
      }
    });

    this.selected = [false, false, false];
    this.selected[index] = true;


  }




}
