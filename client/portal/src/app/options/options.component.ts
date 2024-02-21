import { Component, OnInit } from '@angular/core';
import { ProductService } from '../services/product.service';
import { Product } from '../models/product';
import { ItemType } from '../models/itemType';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { ModalAddCartComponent } from '../modal-add-cart/modal-add-cart.component';
import { Pedido } from '../models/pedido';


@Component({
  selector: 'app-options',
  templateUrl: './options.component.html',
  styleUrls: ['./options.component.css']
})


export class OptionsComponent implements OnInit {

  products: Product[] = [];
  types: ItemType[] = [];
  optionSelected: string = 'Todos';
  selected: boolean[] = [false, false, false];

  constructor(private productService: ProductService, private route: Router, public dialog: MatDialog) {}

  ngOnInit(): void {
    this.fetchProducts();
    this.fetchTypes();
  }

  private fetchProducts(): void {
    this.productService.getProducts().subscribe({
      next: response => {
        this.products = response;
      },
      error: error => console.log(error)
    });
  }

  private fetchTypes(): void {
    this.productService.getTypes().subscribe({
      next: response => {
        this.types = response;
      },
      error: error => console.log(error)
    });
  }

  filterProducts(itemId: number, index: number): void {
    this.productService.getProductByType(itemId).subscribe({
      next: response => {
        this.products = response;

        this.optionSelected = this.types.find(itm => itemId === itm.id)?.name || 'Todos';
        console.log(this.optionSelected);
      }
    });

    this.selected = [false, false, false];
    this.selected[index] = true;
  }

  goToCart(): void {
    this.route.navigate(['/carrinho']);
  }

  openDialog(index: number): void {
    const dialogRef = this.dialog.open(ModalAddCartComponent, {
      data: { id: this.products[index].id, name: this.products[index].name, qtde: 1, price: this.products[index].price }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      if (result !== undefined) {
        this.addCart(result);
      }
    });
  }

  addCart(list: Pedido): void {
    let menuItems: Pedido[] = JSON.parse(localStorage.getItem('ProductsInCart') || '[]');

    const foundItem = menuItems.find(obj => obj.name === list.name);
    if (foundItem) {
      foundItem.qtde += list.qtde;
    } else {
      menuItems.push(list);
    }

    localStorage.setItem('ProductsInCart', JSON.stringify(menuItems));
  }

}
