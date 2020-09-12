import { Component, OnInit } from '@angular/core';
import { ClientService } from '../../../services/clients/client.service';
import { Router } from '@angular/router';

@Component({
	selector: 'app-clients',
	templateUrl: './clients.component.html',
	styles: [],
})
export class ClientsComponent implements OnInit {
	clients: any[] = [];
	cargando = true;

	constructor(public clientService: ClientService, public router: Router) {
		this.clientService.getClients().subscribe((res: any) => {
			console.log(res);
			this.clients = res;
			this.clients.sort((a, b) => a.clientId - b.clientId);
			this.cargando = false;
		});
	}

	ngOnInit(): void {}

	// getClients(pageNu: number) {
	// 	// console.log(pageNu);
	// 	this.clientService.getClients(pageNu).subscribe((res: any) => {
	// 		this.clients = res.object;
	// 		this.pageNu = Number(pageNu);
	// 		// this.pages = new Array(Math.ceil(res.count / 10));
	// 		// this.pages = new Array(Math.ceil(10));
	// 	});
	// }

	dbClick(cliente: any) {
		this.router.navigate(['/clients', cliente.clientId]);
	}

	new() {
		this.router.navigate(['/clients', 'new']);
	}

	search(term: string) {
		this.clientService.seacrhClientByDocument(term).subscribe((res: any) => {
			console.log(res);
			if (res) {
				this.router.navigate(['/clients', res.clientId]);
			} else {
				return;
			}
		});
	}
}
