import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Medico } from '../../models/medico.model';
import { User } from '../../models/user.model';
import { Hospital } from '../../models/hospital.model';
import { environment } from '../../../environments/environment.prod';

@Component({
	selector: 'app-busqueda',
	templateUrl: './busqueda.component.html',
	styles: [],
})
export class BusquedaComponent implements OnInit {
	url = environment.url;
	usuarios: User[] = [];
	medicos: Medico[] = [];
	hospitales: Hospital[] = [];
	constructor(public activatedRoute: ActivatedRoute, public http: HttpClient) {
		this.activatedRoute.params.subscribe(params => {
			let termino = params['termino'];
			this.buscar(termino);
		});
	}

	ngOnInit(): void {}

	buscar(termino: string) {
		let url = this.url + '/busqueda/todo/' + termino;
		this.http.get(url).subscribe((res: any) => {
			console.log(res);
			this.hospitales = res.hospitales;
			this.medicos = res.medicos;
			this.usuarios = res.usuarios;
		});
	}
}
