import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../../services/product/product.service';
import { ActivatedRoute, Router } from '@angular/router';
import { MeasureService } from '../../../services/measure/measure.service';
import { NgForm } from '@angular/forms';

@Component({
	selector: 'app-product',
	templateUrl: './product.component.html',
	styles: [],
})
export class ProductComponent implements OnInit {
	product: any = {};
	measures: any[] = [];

	constructor(
		public productService: ProductService,
		public measureService: MeasureService,
		public activatedRoute: ActivatedRoute,
		public router: Router
	) {
		this.measureService.getMeasures().subscribe((res: any) => {
			console.log(res);
			this.measures = res;
		});

		this.activatedRoute.params.subscribe(params => {
			if (params.id !== 'new') {
				let id = Number(params.id);
				this.productService.getProductById(id).subscribe((res: any) => {
					console.log(res);
					this.product = res;
					this.product.id = res.productId;
					this.product.measureId = res.measure.measureId;
				});
			}
		});
	}

	ngOnInit(): void {}

	guardar(f: NgForm) {
		console.log(f);
		if (f.invalid) {
			return;
		}
		console.log(this.product);
		if (this.product.id) {
			this.productService.updateProduct(this.product).subscribe((res: any) => {
				console.log(res);
				this.router.navigate(['/products', res.productId]);
			});
		} else {
			this.productService.createProduct(this.product).subscribe((res: any) => {
				console.log(res);
				this.router.navigate(['/products', res.productId]);
			});
		}
	}

	volver() {
		this.router.navigate(['/products']);
	}
}
