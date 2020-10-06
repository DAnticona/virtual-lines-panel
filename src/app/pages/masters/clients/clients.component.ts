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
		this.getClients();
	}

	ngOnInit(): void {}

	getClients() {
		this.clientService.getClients().subscribe((res: any) => {
			console.log(res);
			this.clients = res;
			this.clients.sort((a, b) => a.clientId - b.clientId);
			this.cargando = false;
		});
	}

	dbClick(cliente: any) {
		this.router.navigate(['/clients', cliente.clientId]);
	}

	new() {
		this.router.navigate(['/clients', 'new']);
	}

	search(type: string, term: string) {
		this.cargando = true;
		if (term) {
			if (type === '1') {
				this.clientService.seacrhClientByDocument(term).subscribe((res: any) => {
					console.log(res);
					if (res) {
						this.cargando = false;
						this.router.navigate(['/clients', res.clientId]);
					} else {
						this.cargando = false;
						return;
					}
				});
			} else if (type === '2') {
				this.clientService.seacrhClientByName(term).subscribe((res: any) => {
					console.log(res);
					if (res.object) {
						this.clients = res.object;
					}
					this.cargando = false;
				});
			}
		} else {
			this.getClients();
		}
	}
}
