import { Injectable } from '@angular/core';
import { Usuario } from '../../models/usuario.model';
import { HttpClient } from '@angular/common/http';
import { URL_SERVICIOS } from '../../config/config';
import { map, catchError } from 'rxjs/operators';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import { SubirArchivoService } from '../subir-archivo/subir-archivo.service';
import { Observable, throwError } from 'rxjs';

@Injectable({
	providedIn: 'root',
})
export class UsuarioService {
	usuario: Usuario;
	token: string;
	menu: any[] = [];

	constructor(
		public http: HttpClient,
		public router: Router,
		public subirArchivoService: SubirArchivoService
	) {
		// console.log('Servicio Usuario listo');
		this.cargarStorage();
	}

	renuevaToken() {
		let url = URL_SERVICIOS + '/login/renuevatoken';
		url += '?token=' + this.token;
		console.log(url);

		return this.http.get(url).pipe(
			map((res: any) => {
				console.log(res);
				this.token = res.token;
				localStorage.setItem('token', this.token);
				console.log('token renovado');

				return true;
			}),
			catchError(err => {
				console.log(err.status);
				this.router.navigate(['/login']);
				Swal.fire('No se pudo renovar token', 'No fue posible renovar token', 'error');
				return throwError(err);
			})
		);
	}

	estaLogueado() {
		return this.token.length > 5 ? true : false;
	}

	cargarStorage() {
		if (localStorage.getItem('token')) {
			this.token = localStorage.getItem('token');
			this.usuario = JSON.parse(localStorage.getItem('usuario'));
			this.menu = JSON.parse(localStorage.getItem('menu'));
		} else {
			this.token = '';
			this.usuario = null;
			this.menu = null;
		}
	}

	guardarStorage(id: string, token: string, usuario: Usuario, menu: any) {
		localStorage.setItem('id', id);
		localStorage.setItem('token', token);
		localStorage.setItem('usuario', JSON.stringify(usuario));
		localStorage.setItem('menu', JSON.stringify(menu));

		this.usuario = usuario;
		this.token = token;
		this.menu = menu;
	}

	logout() {
		this.usuario = null;
		this.token = '';
		this.menu = [];
		// localStorage.clear();
		localStorage.removeItem('token');
		localStorage.removeItem('usuario');
		localStorage.removeItem('menu');

		this.router.navigate(['/login']);
	}

	loginGoogle(token: string) {
		let url = URL_SERVICIOS + '/login/google';

		return this.http.post(url, { token }).pipe(
			map((res: any) => {
				this.guardarStorage(res.id, res.token, res.usuario, res.menu);
				return true;
			})
		);
	}

	login(usuario: Usuario, recordar: boolean = false) {
		if (recordar) {
			localStorage.setItem('email', usuario.email);
		} else {
			localStorage.removeItem('email');
		}
		let url = URL_SERVICIOS + '/login';

		return this.http.post(url, usuario).pipe(
			map((res: any) => {
				this.guardarStorage(res.id, res.token, res.usuario, res.menu);
				return true;
			}),
			catchError(err => {
				console.log(err.status);
				Swal.fire('Error en el login', err.error.mensaje, 'error');
				return throwError(err);
			})
		);
	}

	crearUsuario(usuario: Usuario) {
		let url = URL_SERVICIOS + '/usuario';

		return this.http.post(url, usuario).pipe(
			map((res: any) => {
				Swal.fire({
					title: 'Usuario creado',
					text: usuario.email,
					icon: 'success',
					confirmButtonText: 'Ok',
				});
				return res.usuario;
			}),
			catchError(err => {
				console.log(err.status);
				Swal.fire(err.error.mensaje, err.error.errors.message, 'error');
				return throwError(err);
			})
		);
	}

	actualizarUsuario(usuario: Usuario) {
		let url = URL_SERVICIOS + '/usuario/' + usuario._id;

		url += '?token=' + this.token;

		return this.http.put(url, usuario).pipe(
			map((res: any) => {
				if (usuario._id === this.usuario._id) {
					let usuarioDB: Usuario = res.usuario;
					this.guardarStorage(usuarioDB._id, this.token, usuarioDB, this.menu);
				}

				Swal.fire({
					title: 'Usuario actualizado',
					text: this.usuario.nombre,
					icon: 'success',
				});

				return true;
			}),
			catchError(err => {
				console.log(err.status);
				Swal.fire(err.error.mensaje, err.error.errors.message, 'error');
				return throwError(err);
			})
		);
	}

	cambiarImagen(archivo: File, id: string) {
		this.subirArchivoService
			.subirArchivo(archivo, 'usuarios', id)
			.then((res: any) => {
				this.usuario.img = res.usuario.img;
				Swal.fire({
					title: 'Imagen actualizada',
					text: this.usuario.nombre,
					icon: 'success',
				});

				this.guardarStorage(id, this.token, this.usuario, this.menu);
			})
			.catch(res => {
				console.log(res);
			});
	}

	cargarUsuarios(desde: number = 0) {
		let url = URL_SERVICIOS + '/usuario?desde=' + desde;
		return this.http.get(url);
	}

	buscarUsuarios(termino: string) {
		let url = URL_SERVICIOS + '/busqueda/coleccion/usuarios/' + termino;
		return this.http.get(url).pipe(map((res: any) => res.usuarios));
	}

	borrarUsuario(id: string) {
		let url = URL_SERVICIOS + '/usuario/' + id;
		url += '?token=' + this.token;

		return this.http.delete(url).pipe(
			map((res: any) => {
				Swal.fire('¡Eliminado!', 'El usuario ' + res.usuario.nombre + ' ha sido eliminado', 'success');
				return true;
			})
		);
	}
}
