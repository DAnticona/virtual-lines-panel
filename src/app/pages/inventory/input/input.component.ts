import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../../services/product/product.service';
import { MeasureService } from '../../../services/measure/measure.service';
import { ActivatedRoute, Router } from '@angular/router';
import { StockService } from '../../../services/stock/stock.service';
import { NgForm } from '@angular/forms';
import { DatePipe } from '@angular/common';

declare function cierra_modal(id);
declare function open_modal(id);
@Component({
	selector: 'app-input',
	templateUrl: './input.component.html',
	styles: [],
	providers: [DatePipe],
})
export class InputComponent implements OnInit {
	cargando = true;
	product: any = {};
	measure: any = {};
	stocks: any[] = [];
	stock: any = {};
	constructor(
		public productService: ProductService,
		public measureService: MeasureService,
		public stockService: StockService,
		public activatedRoute: ActivatedRoute,
		public router: Router,
		private datePipe: DatePipe
	) {
		this.activatedRoute.params.subscribe(params => {
			let id = params.id;
			this.productService.getProductById(id).subscribe((res: any) => {
				console.log(res);
				this.product = res;
				this.measure = res.measure;
			});

			this.loadStocks(id);
		});
	}

	loadStocks(id: number) {
		this.stockService.getStocksByProductId(id).subscribe((res: any) => {
			console.log(res);
			this.stocks = res;
			this.cargando = false;
		});
	}

	ngOnInit(): void {}

	getQuantity(): number {
		let quantity = 0;
		for (let s of this.stocks) {
			quantity += s.quantity;
		}

		return quantity;
	}

	dbClick(stock: any) {
		console.log(stock);
		this.stock = stock;
		this.stock.date = this.datePipe.transform(new Date(this.stock.date), 'yyyy-MM-dd');
		open_modal('stock');
	}

	new() {
		this.stock = {};
		this.stock.productId = this.product.productId;
	}

	guardar(f: NgForm) {
		console.log(this.stock);
		if (f.invalid) {
			return;
		}
		this.cargando = true;
		if (this.stock.stockId) {
			this.stockService.updateStock(this.stock).subscribe(
				(res: any) => {
					console.log(res);
					this.cargando = false;
					this.loadStocks(this.product.productId);
					cierra_modal('stock');
				},
				(err: any) => {
					this.cargando = false;
				}
			);
		} else {
			this.stockService.createStock(this.stock).subscribe(
				(res: any) => {
					console.log(res);
					this.cargando = false;
					this.loadStocks(this.product.productId);
					cierra_modal('stock');
				},
				(err: any) => {
					this.cargando = false;
				}
			);
		}
	}

	back() {
		this.router.navigate(['/inputs']);
	}
}
