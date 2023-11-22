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

  ngOnInit(): void {
    this.getValuesFromLocalStorage();
  }


  getValuesFromLocalStorage() {
    // Check if localStorage is supported
    if (typeof localStorage !== 'undefined') {
      // Retrieve data from localStorage
      const storedData = localStorage.getItem('ProductsInCart'); // Replace 'yourKey' with the key you've used to store data

      if (storedData) {
        try {
          // Parse the retrieved data (assuming it's JSON)
          const parsedData = JSON.parse(storedData);

          // Check if the parsed data is an array
          if (Array.isArray(parsedData)) {
            // Store the values in an array
            this.pedidos = parsedData; // Replace 'any' with the specific type of your data if known

            // Now you have your data in the 'dataArray' variable
            console.log(this.pedidos);
          } else {
            console.error('Retrieved data is not an array.');
          }
        } catch (error) {
          console.error('Error parsing data:', error);
        }
      } else {
        console.error('No data found in localStorage for the provided key.');
      }
    } else {
      console.error('localStorage is not supported in this browser.');
    }

  }

  onPlusItem(id: number) {
    let menuItems: any = localStorage.getItem("ProductsInCart") || '[]';
    menuItems = JSON.parse(menuItems);

    menuItems.forEach((obj: any) => {
      if (obj.id === id) {
        // Increase the value in the same object
        obj.qtde++;
      }
    });

    localStorage.setItem("ProductsInCart", JSON.stringify(menuItems));
    this.getValuesFromLocalStorage();
  }

  onSubItem(id: number) {
    let menuItems: any = localStorage.getItem("ProductsInCart") || '[]';
    menuItems = JSON.parse(menuItems);

    menuItems.forEach((obj: any) => {
      if (obj.id === id && obj.qtde > 1) {
        // Increase the value in the same object
        obj.qtde--;
      }
    });

    localStorage.setItem("ProductsInCart", JSON.stringify(menuItems));
    this.getValuesFromLocalStorage();
  }

  getTotal(): number {
    let menuItems: any = localStorage.getItem("ProductsInCart") || '[]';
    menuItems = JSON.parse(menuItems);

    let totalPrice = menuItems.reduce((total: any, currentItem: any) => {
      return total + (currentItem.price * currentItem.qtde);
    }, 0);

    return totalPrice;
  }
}
