import { Component, Input, OnInit,  inject } from '@angular/core';
import { Items, Pedido } from '../models/pedido';
import { PedidosService } from '../pedidos.service';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CommonModule } from '@angular/common';



@Component({
	selector: 'ngbd-modal-content',
	standalone: true,
	imports: [CommonModule],
	template: `
		<div class="modal-header">
			<h4 class="modal-title">Hi there!</h4>
			<button type="button" class="btn-close" aria-label="Close" (click)="activeModal.dismiss('Cross click')"></button>
		</div>
		<div class="modal-body">
			<div *ngFor="let item of pedido" >
			<p>{{ item.product.name + " : " + item.qtde }}</p>
			</div>
		</div>
		<div class="modal-footer">
			<button type="button" class="btn btn-outline-dark" (click)="activeModal.close('Close click')">Close</button>
		</div>
	`,
})

export class NgbdModalContent {
	activeModal = inject(NgbActiveModal);
  	@Input() pedido: any;

}


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})

export class HomeComponent implements OnInit{

  private modalService = inject(NgbModal);

	open(pedido: Items[]) {
		const modalRef = this.modalService.open(NgbdModalContent);

		modalRef.componentInstance.pedido = pedido;
	}

  pedido: Pedido[] = [];

  constructor(private pedidoService: PedidosService) {}

  ngOnInit(): void {
    this.getAllOrders();
  }

  getAllOrders() {
    this.pedidoService.getOrders().subscribe({
      next: (response) => {
      this.pedido = response;
      console.log(this.pedido);
    }
    })
  }

  
}
