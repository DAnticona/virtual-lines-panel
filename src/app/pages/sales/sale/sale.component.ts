import { Component, OnInit } from '@angular/core';
import { SaleService } from '../../../services/sale/sale.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ClientService } from '../../../services/clients/client.service';
import { ProductService } from '../../../services/product/product.service';
import { DatePipe } from '@angular/common';
import { StockService } from '../../../services/stock/stock.service';
import { NgForm } from '@angular/forms';
import { v4 as uuid } from 'uuid';
import Swal from 'sweetalert2';

declare function cierra_modal(id);
declare function open_modal(id);

@Component({
	selector: 'app-sale',
	templateUrl: './sale.component.html',
	styles: [],
	providers: [DatePipe],
})
export class SaleComponent implements OnInit {
	cargando = false;
	sale: any = {};
	items: any[] = [];
	item: any = {};
	clients: any[] = [];
	client: any = {};
	idClientSelected: number;
	products: any[] = [];
	product: any = {};
	idProductSelected: number;
	stocks: any[] = [];
	stock: any = {};
	idStockSelected: number;
	nuevaVenta = true;
	active = true;

	constructor(
		public saleService: SaleService,
		public clientService: ClientService,
		public productService: ProductService,
		public stockService: StockService,
		public activatedRoute: ActivatedRoute,
		public router: Router,
		public datePipe: DatePipe
	) {
		this.activatedRoute.params.subscribe(params => {
			this.sale.activeFg = this.active ? 'S' : 'N';
			this.sale.amount = 0;
			this.sale.date = datePipe.transform(new Date(), 'yyyy-MM-dd');
			if (params.id !== 'new') {
				this.cargando = true;
				this.nuevaVenta = false;
				let id = Number(params.id);
				this.saleService.getSaleById(id).subscribe((res: any) => {
					console.log(res);
					this.sale = res;
					this.active = this.sale.activeFg === 'S' ? true : false;
					this.sale.date = this.datePipe.transform(new Date(res.date), 'yyyy-MM-dd');
					this.items = res.details;
					for (let i of this.items) {
						i.serviceFg = i.serviceFg === 'S' ? true : false;
						if (!i.serviceFg) {
							this.productService.getProductById(i.stock.productId).subscribe((res1: any) => {
								console.log(res1);
								i.serviceName = res1.name;
								console.log(this.items);
							});
						}
					}
					if (this.sale.client) {
						this.getClientById(this.sale.client.clientId);
					}
					this.cargando = false;
				});
			}
		});
	}

	activeValue(value: string) {
		console.log(value);
		if (value === 'N') {
			Swal.fire({
				title: '¿Estás seguro?',
				text: 'Esta acción es irreversible, se actualizarán los stocks',
				icon: 'warning',
				showCancelButton: true,
				confirmButtonText: `Sí, estoy seguro !`,
				cancelButtonText: `Cancelar`,
			}).then(result => {
				if (result.value) {
					this.sale.activeFg = value;
					this.saleService.anullSale(this.sale).subscribe((res: any) => {
						this.router.navigate(['/sales', res.saleId]);
					});
				} else {
					this.active = true;
					this.sale.activeFg = 'S';
				}
			});
		}
	}

	ngOnInit(): void {}

	getClients() {
		this.clientService.getClients().subscribe((res: any) => {
			console.log(res);
			this.clients = res;
		});
	}

	getClient() {
		if (this.idClientSelected) {
			this.getClientById(this.idClientSelected);
		}
		cierra_modal('clients');
	}

	searchClient(term: string) {
		if (term) {
			this.clientService.seacrhClientByDocument(term).subscribe((res: any) => {
				console.log(res);
				if (res) {
					this.clients = [];
					this.clients.push(res);
				} else {
					return;
				}
			});
		} else {
			this.getClients();
		}
	}

	getClientById(id: number) {
		this.client = {};
		this.clientService.getClientById(id).subscribe((res: any) => {
			this.sale.clientId = res.clientId;
			if (res.person) {
				this.client.document = res.person.documentNu;
				this.client.name = `${res.person.name} ${res.person.lastname}`;
			} else if (res.company) {
				this.client.document = res.company.documentNu;
				this.client.name = res.company.legalName;
			}
			this.cargando = false;
		});
	}

	addItem() {
		this.item = {};
		this.item.uuid = uuid();
		this.item.serviceFg = true;
		this.item.quantity = 1.0;
		this.item.unitPrice = 0.0;
		this.item.totalPrice = this.item.quantity * this.item.unitPrice;
		this.items.push(this.item);
	}

	service(item: any) {
		console.log(item);
		if (!item.serviceFg) {
			this.getStocks();
			open_modal('item');
		} else {
			this.item.productId = null;
			this.item.stockId = null;
		}
	}

	selectStock(stock: any) {
		console.log(stock);
		this.idProductSelected = stock.productId;
		this.idStockSelected = stock.stockId;
		this.stock = stock;
	}

	getItem() {
		this.item.unitPrice = this.stock.unitPrice;
		this.item.serviceName = this.stock.productName;
		this.item.productId = this.stock.productId;
		this.item.stockId = this.stock.stockId;
		this.item.totalPrice = this.item.quantity * this.item.unitPrice;
		this.getAmount();
		cierra_modal('item');
	}

	closeModalItems() {
		if (!this.item.productId) {
			this.item.serviceFg = true;
		}
		cierra_modal('item');
	}

	deleteItem(item: any) {
		this.items = this.items.filter(f => f.uuid !== item.uuid);
		this.getAmount();
	}

	getStocks() {
		this.stockService.getStocksBiggerThanZero().subscribe((res: any) => {
			this.stocks = res;
			this.stocks.sort((a, b) => a.productId - b.productId);
			for (let s of this.stocks) {
				this.productService.getProductById(s.productId).subscribe((res1: any) => {
					s.productName = res1.name;
					s.measureSign = res1.measure.sign;
				});
			}
		});
	}

	getTotalPrice(item: any) {
		item.totalPrice = item.quantity * item.unitPrice;
		this.getAmount();
	}

	isNumber(value: any): boolean {
		if (isNaN(value)) {
			return false;
		}
		return true;
	}

	getAmount() {
		let amount = 0;
		for (let i of this.items) {
			amount += i.totalPrice;
		}
		this.sale.amount = amount;
	}

	searchProduct(term: string) {
		if (term) {
			this.stocks = this.stocks.filter(f => f.productName.toUpperCase().includes(term.toUpperCase()));
			console.log(this.stocks);
		} else {
			this.getStocks();
		}
	}

	guardar(f: NgForm) {
		if (f.invalid) {
			return;
		}

		this.cargando = true;

		for (let i of this.items) {
			i.serviceFg = i.serviceFg ? 'S' : 'N';
			if (isNaN(i.quantity) || isNaN(i.unitPrice) || isNaN(i.totalPrice)) {
				return;
			}
		}

		if (!this.sale.saleId) {
			this.sale.details = this.items;
			console.log(this.sale);
			this.saleService.createSale(this.sale).subscribe(
				(res: any) => {
					console.log(res);
					this.cargando = false;
					this.router.navigate(['/sales', res.saleId]);
				},
				(err: any) => {
					this.cargando = false;
				}
			);
		}
	}

	volver() {
		this.router.navigate(['/sales']);
	}
}
