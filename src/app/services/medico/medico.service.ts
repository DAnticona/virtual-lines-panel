import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import Swal from 'sweetalert2';
import { UserService } from '../user/user.service';
import { Medico } from '../../models/medico.model';
import { environment } from '../../../environments/environment';

@Injectable({
	providedIn: 'root',
})
export class MedicoService {
	url = environment.url;
	totalMedicos = 0;
	constructor(public http: HttpClient, public userService: UserService) {}

	cargarMedicos() {
		let url = this.url + '/medico';

		return this.http.get(url).pipe(
			map((res: any) => {
				this.totalMedicos = res.total;
				return res.medicos;
			})
		);
	}

	buscarMedicos(termino: string) {
		let url = this.url + '/busqueda/coleccion/medicos/' + termino;
		return this.http.get(url).pipe(map((res: any) => res.medicos));
	}

	borrarMedico(id: string) {
		let url = this.url + '/medico/' + id;
		url += '?token=' + this.userService.token;

		return this.http.delete(url).pipe(
			map((res: any) => {
				Swal.fire({
					title: 'Médico borrado',
					text: 'Médico borrado correctamente',
					icon: 'success',
				});
				return res;
			})
		);
	}

	guardarMedico(medico: Medico) {
		let url = this.url + '/medico';

		if (medico._id) {
			url += '/' + medico._id;
			url += '?token=' + this.userService.token;
			return this.http.put(url, medico).pipe(
				map((res: any) => {
					Swal.fire('Medico Actualizado', medico.nombre, 'success');
					return res.medico;
				})
			);
		} else {
			url += '?token=' + this.userService.token;
			return this.http.post(url, medico).pipe(
				map((res: any) => {
					Swal.fire('Medico Creado', medico.nombre, 'success');
					return res.medico;
				})
			);
		}
	}

	cargarMedico(id: string) {
		let url = this.url + '/medico/' + id;
		return this.http.get(url).pipe(map((res: any) => res.medico));
	}
}
