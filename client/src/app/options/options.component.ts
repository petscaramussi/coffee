import { Component, OnInit } from '@angular/core';
import { ProductService } from '../services/product.service';
import { Product } from '../models/product';
import { itemTypes } from '../models/itemType';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { ModalAddCartComponent } from '../modal-add-cart/modal-add-cart.component';

export interface DialogData {
  id: number;
  name: string;
  qtde: number;
}

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

  pedido: any[] = [];

  

  constructor(private productService: ProductService, private route: Router, public dialog: MatDialog ) {

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

  goToCart() {
    this.route.navigate(['/carrinho']);
  }

  openDialog(index: number): void {
    const dialogRef = this.dialog.open(ModalAddCartComponent, {
      data: {id: this.products[index].id, name: this.products[index].name, qtde: 1},
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      if (result != undefined){
        this.addCart(result);
        console.log(result);
      }
    });
  }

 addCart(list: Object) {
  
    let menuItems: any = localStorage.getItem("ProductsInCart") || '[]';
    menuItems = JSON.parse(menuItems); 

    menuItems.push(list);
    localStorage.setItem("ProductsInCart", JSON.stringify(menuItems));
   }




}
