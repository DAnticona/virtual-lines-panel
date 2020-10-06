import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SaleService } from '../../../services/sale/sale.service';
import { DatePipe } from '@angular/common';

@Component({
	selector: 'app-sales',
	templateUrl: './sales.component.html',
	styles: [],
	providers: [DatePipe],
})
export class SalesComponent implements OnInit {
	cargando = false;
	sales: any[] = [];
	startDate: string;
	endDate: string;
	constructor(public router: Router, public saleService: SaleService, public datePipe: DatePipe) {
		this.startDate = this.datePipe.transform(new Date(), 'yyyy-MM-dd');
		this.endDate = this.datePipe.transform(new Date(), 'yyyy-MM-dd');
		this.getSales();
	}

	getSales() {
		this.cargando = true;
		this.saleService.getSales(this.startDate, this.endDate).subscribe(
			(res: any) => {
				console.log(res);
				this.sales = res.object;
				this.cargando = false;
			},
			(err: any) => {
				this.cargando = false;
			}
		);
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
