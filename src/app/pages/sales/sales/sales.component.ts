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
	constructor(public router: Router, public saleService: SaleService) {
		this.saleService.getSales().subscribe((res: any) => {
			console.log(res);
			this.sales = res;
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
