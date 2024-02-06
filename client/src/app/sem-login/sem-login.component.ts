import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { CartItem } from '../models/cartItem';
import { PedidoService } from '../services/pedido.service';
import { Pedido } from '../models/pedido';

@Component({
  selector: 'app-sem-login',
  templateUrl: './sem-login.component.html',
  styleUrls: ['./sem-login.component.css']
})
export class SemLoginComponent implements OnInit {

  pedidos: Pedido[] = [];
  pedidosDestruct: any[] = [];

  // Keys to keep
  keysToKeep = ['idProduct', 'qtde'];

  // init object
  pedido: CartItem = {
    name: null,
    address: null,
    tel: null,
    addressComplement: null,
    payment: null,
    Items: [
      { productId: 0, qtde: 0 },
      { productId: 0, qtde: 0 }
    ]
  };

  ngOnInit(): void {
    this.getValuesFromLocalStorage();
    console.log(this.pedidos);
    this.reduceArrayOfObeject();
  }

  constructor(private pedidoService: PedidoService) { }


  reduceArrayOfObeject() {
    // Function to reduce array of objects to contain only specified keys
    const reduceArray = <T extends object, K extends keyof T>(arr: T[], keysToKeep: K[]): Pick<T, K>[] => {
      return arr.map(obj => {
        const reducedObj = {} as Pick<T, K>;
        keysToKeep.forEach(key => {
          if (key in obj) {
            reducedObj[key] = obj[key];
          }
        });
        return reducedObj;
      });
    }; 

    // Reduce the array
    this.pedidosDestruct = reduceArray(this.pedidos, ['id', 'qtde']);

    console.log(this.pedidosDestruct);
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

  loginForm = new FormGroup({
    name: new FormControl('', Validators.required),
    tel: new FormControl('', Validators.required),
    address: new FormControl('', Validators.required),
    complement: new FormControl('', Validators.required),
    payment: new FormControl('', Validators.required),
  });

  onSubmit() {
    this.pedido = {
      name: this.loginForm.value.name,
      address: this.loginForm.value.address,
      tel: this.loginForm.value.tel,
      addressComplement: this.loginForm.value.complement,
      payment: this.loginForm.value.payment,
      Items: 
        this.pedidosDestruct
    }

    console.log(this.pedido);

    this.pedidoService.setOrder(this.pedido);
  }
}
