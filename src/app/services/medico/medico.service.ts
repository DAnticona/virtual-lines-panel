import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { URL_SERVICIOS } from '../../config/config';
import { map } from 'rxjs/operators';
import { UsuarioService } from '../usuario/usuario.service';
import Swal from 'sweetalert2';
import { Medico } from '../../models/medico.model';

@Injectable({
	providedIn: 'root',
})
export class MedicoService {
	totalMedicos = 0;
	constructor(public http: HttpClient, public usuarioService: UsuarioService) {}

	cargarMedicos() {
		let url = URL_SERVICIOS + '/medico';

		return this.http.get(url).pipe(
			map((res: any) => {
				this.totalMedicos = res.total;
				return res.medicos;
			})
		);
	}

	buscarMedicos(termino: string) {
		let url = URL_SERVICIOS + '/busqueda/coleccion/medicos/' + termino;
		return this.http.get(url).pipe(map((res: any) => res.medicos));
	}

	borrarMedico(id: string) {
		let url = URL_SERVICIOS + '/medico/' + id;
		url += '?token=' + this.usuarioService.token;

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
		let url = URL_SERVICIOS + '/medico';

		if (medico._id) {
			url += '/' + medico._id;
			url += '?token=' + this.usuarioService.token;
			return this.http.put(url, medico).pipe(
				map((res: any) => {
					Swal.fire('Medico Actualizado', medico.nombre, 'success');
					return res.medico;
				})
			);
		} else {
			url += '?token=' + this.usuarioService.token;
			return this.http.post(url, medico).pipe(
				map((res: any) => {
					Swal.fire('Medico Creado', medico.nombre, 'success');
					return res.medico;
				})
			);
		}
	}

	cargarMedico(id: string) {
		let url = URL_SERVICIOS + '/medico/' + id;
		return this.http.get(url).pipe(map((res: any) => res.medico));
	}
}
