import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../../services/product/product.service';
import { Router } from '@angular/router';

@Component({
	selector: 'app-inputs',
	templateUrl: './inputs.component.html',
	styles: [],
})
export class InputsComponent implements OnInit {
	products: any[] = [];
	cargando = true;
	pageNu = 1;
	pages = 1;

	constructor(public productService: ProductService, public router: Router) {
		this.loadProducts();
	}

	ngOnInit(): void {}

	getProducts(pageNu: number) {
		this.productService.getProducts(pageNu).subscribe((res: any) => {
			this.products = res.object;
			this.pageNu = Number(pageNu);
		});
	}

	loadProducts() {
		this.productService.getProducts(this.pageNu).subscribe((res: any) => {
			this.products = res.object;
			this.pages = Math.ceil(res.count / 10);
			this.products.sort((a, b) => a.productId - b.productId);
			this.cargando = false;
		});
	}

	dbClick(product: any) {
		this.router.navigate(['/inputs', product.productId]);
	}

	new() {
		this.router.navigate(['/inputs', 'new']);
	}

	search(term: string) {
		if (term) {
			this.cargando = true;
			this.productService.seacrhProductByName(term).subscribe((res: any) => {
				console.log(res);
				this.products = res;
				this.cargando = false;
			});
		} else {
			this.loadProducts();
		}
	}

	getStock(product: any): number {
		let quantity = 0;
		for (let s of product.stocks) {
			quantity += s.quantity;
		}
		return quantity;
	}
}
