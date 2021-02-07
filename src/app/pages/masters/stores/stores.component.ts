import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { StoresService } from '../../../services/stores/stores.service';

@Component({
	selector: 'app-stores',
	templateUrl: './stores.component.html',
	styles: [],
})
export class StoresComponent implements OnInit {
	loading: boolean;
	stores: any[] = [];
	pages: number;
	pageNu: number;

	constructor(public storeService: StoresService) {
		this.pageNu = 1;
		this.pages = 1;
	}

	ngOnInit(): void {
		this.getStores(this.pageNu);
	}

	getStores(pageNu: number) {
		this.loading = true;
		this.storeService.getStores(pageNu).subscribe((res: any) => {
			this.pages = Math.ceil(res.count / 12);
			this.pageNu = pageNu;
			this.stores = res.object;
			this.loading = false;
		});
	}

	search(term: string) {
		this.pageNu = 1;
		this.pages = 1;

		if (term) {
			this.loading = true;
			this.storeService.searchStoresByName(term).subscribe((res: any) => {
				this.stores = res.object;
				this.loading = false;
			});
		} else {
			this.getStores(1);
		}
	}

	toggleActive(store: any, event: any) {
		const message = event.target.checked ? 'activar' : 'inactivar';

		Swal.fire({
			title: '¿Estas seguro?',
			text: `¿Quieres ${message} este establecimiento? ${store.publicName}`,
			icon: 'warning',
			showCancelButton: true,
			confirmButtonColor: '#3085d6',
			cancelButtonColor: '#d33',
			confirmButtonText: 'Sí, ¡Estoy seguro!',
		}).then(result => {
			if (result.value) {
				store.activeFg = event.target.checked ? 'S' : 'N';
				this.storeService.updateStore(store).subscribe(res => {
					console.log(res);
				});
			} else {
				event.target.checked = !event.target.checked;
			}
		});
	}
}
