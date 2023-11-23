import { Component, OnInit } from '@angular/core';
import { Pedido } from '../models/pedido';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  canShow: boolean = false;
  pedidos: Pedido[] = [];

  constructor() {}

  ngOnInit(): void {
    this.getValuesFromLocalStorage();
  }

  private getLocalStorageData(key: string): Pedido[] | null {
    const storedData = localStorage.getItem(key);
    if (storedData) {
      try {
        const parsedData = JSON.parse(storedData);
        if (Array.isArray(parsedData)) {
          return parsedData;
        } else {
          console.error('Retrieved data is not an array.');
        }
      } catch (error) {
        console.error('Error parsing data:', error);
      }
    } else {
      console.error(`No data found in localStorage for the key: ${key}.`);
    }
    return null;
  }

  private updateLocalStorageData(key: string, data: Pedido[]): void {
    localStorage.setItem(key, JSON.stringify(data));
    this.getValuesFromLocalStorage();
  }

  getValuesFromLocalStorage(): void {
    if (typeof localStorage !== 'undefined') {
      const key = 'ProductsInCart';
      const parsedData = this.getLocalStorageData(key);
      if (parsedData) {
        this.pedidos = parsedData;
      }
    } else {
      console.error('localStorage is not supported in this browser.');
    }
  }

  updateItemQuantity(id: number, increment: boolean): void {
    const key = 'ProductsInCart';
    let menuItems: Pedido[] = this.getLocalStorageData(key) || [];

    const foundItem = menuItems.find(item => item.id === id);
    if (foundItem) {
      if (increment) {
        foundItem.qtde++;
      } else {
        if (foundItem.qtde > 1) {
          foundItem.qtde--;
        }
      }
      this.updateLocalStorageData(key, menuItems);
    }
  }

  getTotal(): number {
    const key = 'ProductsInCart';
    const menuItems: Pedido[] = this.getLocalStorageData(key) || [];

    const totalPrice = menuItems.reduce((total, currentItem) => {
      return total + currentItem.price * currentItem.qtde;
    }, 0);

    return totalPrice;
  }
}
