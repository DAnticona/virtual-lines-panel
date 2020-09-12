import { Component, OnInit } from '@angular/core';
import { MeasureService } from '../../../services/measure/measure.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
	selector: 'app-measure',
	templateUrl: './measure.component.html',
	styles: [],
})
export class MeasureComponent implements OnInit {
	measure: any = {};

	constructor(
		public measureService: MeasureService,
		public activatedRoute: ActivatedRoute,
		public router: Router
	) {
		this.activatedRoute.params.subscribe(params => {
			if (params.id !== 'new') {
				let id = Number(params.id);
				this.measureService.getMeasureById(id).subscribe((res: any) => {
					console.log(res);
					this.measure = res;
					this.measure.id = res.measureId;
				});
			}
		});
	}

	ngOnInit(): void {}

	guardar() {
		console.log(this.measure);
		if (this.measure.id) {
			this.measureService.updateMeasure(this.measure).subscribe((res: any) => {
				console.log(res);
				this.router.navigate(['/measures', res.measureId]);
			});
		} else {
			this.measureService.createMeasure(this.measure).subscribe((res: any) => {
				console.log(res);
				this.router.navigate(['/measures', res.measureId]);
			});
		}
	}

	volver() {
		this.router.navigate(['/measures']);
	}
}
