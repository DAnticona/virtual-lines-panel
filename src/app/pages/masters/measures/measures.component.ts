import { Component, OnInit } from '@angular/core';
import { MeasureService } from '../../../services/measure/measure.service';
import { Router } from '@angular/router';

@Component({
	selector: 'app-measures',
	templateUrl: './measures.component.html',
	styles: [],
})
export class MeasuresComponent implements OnInit {
	measures: any[] = [];

	constructor(public measureService: MeasureService, public router: Router) {
		this.measureService.getMeasures().subscribe((res: any) => {
			console.log(res);
			this.measures = res;
		});
	}

	ngOnInit(): void {}

	dbClick(measure: any) {
		console.log(measure);
		this.router.navigate(['/measures', measure.measureId]);
	}

	new() {
		this.router.navigate(['/measures', 'new']);
	}

	search(term: string) {
		console.log(term);
	}
}
