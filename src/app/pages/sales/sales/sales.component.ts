import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SaleService } from '../../../services/sale/sale.service';

@Component({
	selector: 'app-sales',
	templateUrl: './sales.component.html',
	styles: [],
})
export class SalesComponent implements OnInit {
	cargando = false;
	sales: any[] = [];
	pageNu = 1;
	pages = 1;
	constructor(public router: Router, public saleService: SaleService) {
		this.saleService.getSales(this.pageNu).subscribe((res: any) => {
			console.log(res);
			this.sales = res.object;
			this.pages = Math.ceil(res.count / 10);
		});
	}

	getSales(pageNu: number) {
		// console.log(pageNu);
		this.saleService.getSales(pageNu).subscribe((res: any) => {
			this.sales = res.object;
			this.pageNu = Number(pageNu);
		});
	}

	ngOnInit(): void {}

	getClientDocument(sale: any): string {
		if (!sale.client) {
			return null;
		}
		if (sale.client.company) {
			return sale.client.company.documentNu;
		} else {
			return sale.client.person.documentNu;
		}
	}

	getClientName(sale: any): string {
		if (!sale.client) {
			return null;
		}
		if (sale.client.company) {
			return sale.client.company.legalName;
		} else {
			return sale.client.person.name + sale.client.person.lastname;
		}
	}

	dbClick(sale: any) {
		console.log(sale);
		this.router.navigate(['sales', sale.saleId]);
	}

	new() {
		this.router.navigate(['sales', 'new']);
	}
}
