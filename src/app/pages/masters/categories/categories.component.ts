import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { CategoryService } from '../../../services/categories/category.service';
import { StoresService } from '../../../services/stores/stores.service';

@Component({
	selector: 'app-categories',
	templateUrl: './categories.component.html',
	styles: [],
})
export class CategoriesComponent implements OnInit {
	loading: boolean;
	categories: any[] = [];
	category: any = {};
	stores: any[] = [];

	constructor(
		public categoryService: CategoryService,
		private storesService: StoresService,
		private router: Router
	) {}

	ngOnInit(): void {
		this.getCategories();
	}

	getCategories() {
		this.loading = true;
		this.categoryService.getCategories().subscribe((res: any) => {
			this.categories = res.object;
			this.loading = false;
		});
	}

	save(category: any, event: any) {
		const message = event.target.checked ? 'activar' : 'inactivar';

		Swal.fire({
			title: '¿Estas seguro?',
			text: `¿Quieres ${message} esta categoría? ${category.name}`,
			icon: 'warning',
			showCancelButton: true,
			confirmButtonColor: '#3085d6',
			cancelButtonColor: '#d33',
			confirmButtonText: 'Sí, ¡Estoy seguro!',
		}).then(result => {
			if (result.value) {
				category.activeFg = event.target.checked ? 'S' : 'N';
				this.categoryService.save(category).subscribe(res => {
					if (res) {
						this.getCategories();
					}
				});
			} else {
				event.target.checked = !event.target.checked;
			}
		});
	}

	new() {
		this.router.navigate(['/category']);
	}

	selectCategory(category: any) {
		this.category = category;

		this.storesService.getStoresByCategory(this.category.categoryId).subscribe((res: any) => {
			this.stores = res.object;
		});
	}
}
