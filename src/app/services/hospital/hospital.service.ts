import { Injectable } from '@angular/core';
import { Hospital } from '../../models/hospital.model';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { SubirArchivoService } from '../service.index';
import { URL_SERVICIOS } from 'src/app/config/config';
import { map } from 'rxjs/operators';
import { UserService } from '../user/user.service';
import Swal from 'sweetalert2';

@Injectable({
	providedIn: 'root',
})
export class HospitalService {
	token: string;
	hospital: Hospital;
	constructor(
		public http: HttpClient,
		public router: Router,
		public subirArchivoService: SubirArchivoService,
		public userService: UserService
	) {
		this.token = userService.token;
	}

	cargarHospitales(desde: number = 0) {
		let url = URL_SERVICIOS + '/hospital?desde=' + desde;
		return this.http.get(url);
	}

	obtenerHospital(id: string) {
		let url = URL_SERVICIOS + '/hospital/' + id;
		return this.http.get(url).pipe(map((res: any) => res.hospital));
	}

	borrarHospital(id: string) {
		let url = URL_SERVICIOS + '/hospital/' + id;
		url += '?token=' + this.token;

		return this.http.delete(url).pipe(
			map((res: any) => {
				Swal.fire('¡Eliminado!', 'El hospital ' + res.hospital.nombre + ' ha sido eliminado', 'success');
				return true;
			})
		);
	}

	crearHospital(nombre: string) {
		let url = URL_SERVICIOS + '/hospital';
		url += '?token=' + this.token;
		return this.http.post(url, { nombre }).pipe(
			map(res => {
				Swal.fire({
					title: 'Hospital creado',
					text: nombre,
					icon: 'success',
				});
				return true;
			})
		);
	}

	buscarHospital(termino: string) {
		let url = URL_SERVICIOS + '/busqueda/coleccion/hospitales/' + termino;
		return this.http.get(url).pipe(map((res: any) => res.hospitales));
	}

	actualizarHospital(hospital: Hospital) {
		let url = URL_SERVICIOS + '/hospital/' + hospital._id;

		url += '?token=' + this.token;

		return this.http.put(url, hospital).pipe(
			map((res: any) => {
				Swal.fire({
					title: 'Hospital actualizado',
					text: hospital.nombre,
					icon: 'success',
				});

				return true;
			})
		);
	}

	cambiarImagen(archivo: File, id: string) {
		this.subirArchivoService
			.subirArchivo(archivo, 'hospitales', id)
			.then((res: any) => {
				this.hospital.img = res.hospital.img;
				Swal.fire({
					title: 'Imagen actualizada',
					text: this.hospital.nombre,
					icon: 'success',
				});
			})
			.catch(res => {
				console.log(res);
			});
	}
}
