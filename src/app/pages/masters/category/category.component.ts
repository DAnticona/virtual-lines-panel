import { Component, OnInit } from '@angular/core';
import { CategoryService } from '../../../services/categories/category.service';
import { Router } from '@angular/router';

@Component({
	selector: 'app-category',
	templateUrl: './category.component.html',
	styles: [''],
})
export class CategoryComponent implements OnInit {
	category: any = {};
	docTypes: any[] = [];
	roles: any[] = [];
	active = true;

	constructor(public categoryService: CategoryService, public router: Router) {}

	ngOnInit(): void {}

	activeValue(value: string) {
		console.log(value);
		this.category.activeFg = value;
	}

	guardar() {
		this.categoryService.save(this.category).subscribe();
	}

	volver() {
		this.router.navigate(['/categories']);
	}
}
