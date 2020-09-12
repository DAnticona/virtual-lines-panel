import { Injectable } from '@angular/core';
import { User } from '../../models/user.model';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { URL_SERVICIOS } from '../../config/config';
import { map, catchError } from 'rxjs/operators';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import { SubirArchivoService } from '../subir-archivo/subir-archivo.service';
import { Observable, throwError } from 'rxjs';
import { Menu } from '../../models/menu.model';

@Injectable({
	providedIn: 'root',
})
export class UserService {
	user: any = {};
	token: string;
	menus: any[] = [];

	constructor(
		public http: HttpClient,
		public router: Router,
		public subirArchivoService: SubirArchivoService
	) {
		this.loadStorage();
	}

	login(user: any, rememberme: boolean = false) {
		if (rememberme) {
			localStorage.setItem('username', user.username);
		} else {
			localStorage.removeItem('username');
		}

		let url = URL_SERVICIOS + '/login';

		return this.http.post(url, user).pipe(
			map((res: any) => {
				console.log(res.user);
				this.user = res.user;
				this.menus = res.user.role.menus;
				this.token = res.token;

				this.menus.sort((a, b) => a.orderNu - b.orderNu);
				for (let menu of this.menus) {
					menu.submenus.sort((a, b) => a.orderNu - b.orderNu);
				}

				this.saveStorage(this.user, this.token, this.menus);
				return true;
			}),
			catchError(err => {
				console.log(err);
				Swal.fire('Error en el login', err.error.message, 'error');
				return throwError(err);
			})
		);
	}

	// renuevaToken() {
	// 	let url = URL_SERVICIOS + '/login/renuevatoken';
	// 	url += '?token=' + this.token;
	// 	console.log(url);

	// 	return this.http.get(url).pipe(
	// 		map((res: any) => {
	// 			console.log(res);
	// 			this.token = res.token;
	// 			localStorage.setItem('token', this.token);
	// 			console.log('token renovado');

	// 			return true;
	// 		}),
	// 		catchError(err => {
	// 			console.log(err.status);
	// 			this.router.navigate(['/login']);
	// 			Swal.fire('No se pudo renovar token', 'No fue posible renovar token', 'error');
	// 			return throwError(err);
	// 		})
	// 	);
	// }

	isLogged() {
		return this.token.length > 5 ? true : false;
	}

	loadStorage() {
		if (localStorage.getItem('token')) {
			this.token = localStorage.getItem('token');
			this.user = JSON.parse(localStorage.getItem('authUser'));
			this.menus = JSON.parse(localStorage.getItem('menus'));
		} else {
			this.token = '';
			this.user = null;
			this.menus = null;
		}
	}

	saveStorage(authUser: any, token: string, menus: Menu[]) {
		localStorage.setItem('token', token);
		localStorage.setItem('authUser', JSON.stringify(authUser));
		localStorage.setItem('menus', JSON.stringify(menus));

		this.user = authUser;
	}

	logout() {
		this.user = null;
		this.token = '';
		this.menus = [];
		// localStorage.clear();
		localStorage.removeItem('token');
		localStorage.removeItem('authUser');
		localStorage.removeItem('menus');

		this.router.navigate(['/login']);
	}

	createUser(user: any) {
		let url = URL_SERVICIOS + '/users';

		const httpOptions = {
			headers: new HttpHeaders({
				Authorization: `${this.token}`,
				'Content-Type': 'application/json',
			}),
		};

		return this.http.post(url, user, httpOptions).pipe(
			map((res: any) => {
				Swal.fire({
					title: 'Usuario creado',
					text: user.username,
					icon: 'success',
					confirmButtonText: 'Ok',
				});
				return res;
			}),
			catchError(err => {
				console.log(err);
				Swal.fire(err.error.mensaje, err.error.message, 'error');
				return throwError(err);
			})
		);
	}

	updateUser(user: any) {
		let url = URL_SERVICIOS + '/users';

		const httpOptions = {
			headers: new HttpHeaders({
				Authorization: `${this.token}`,
				'Content-Type': 'application/json',
			}),
		};

		return this.http.put(url, user, httpOptions).pipe(
			map((res: any) => {
				console.log(res);
				if (user.id === this.user.id) {
					this.user = res;
					this.saveStorage(this.user, this.token, this.menus);
				}

				Swal.fire({
					title: 'Usuario actualizado',
					text: user.name,
					icon: 'success',
				});

				return res;
			}),
			catchError(err => {
				console.log(err);
				Swal.fire(err.error.message, err.error.message, 'error');
				return throwError(err);
			})
		);
	}

	cambiarImagen(archivo: File, id: string) {
		this.subirArchivoService
			.subirArchivo(archivo, 'usuarios', id)
			.then((res: any) => {
				this.user.img = res.usuario.img;
				Swal.fire({
					title: 'Imagen actualizada',
					text: this.user.name,
					icon: 'success',
				});

				this.saveStorage(res, this.token, this.menus);
			})
			.catch(res => {
				console.log(res);
			});
	}

	getUsers() {
		console.log('get Users');
		let url = URL_SERVICIOS + '/users';

		const httpOptions = {
			headers: new HttpHeaders({
				Authorization: `${this.token}`,
				'Content-Type': 'application/json',
			}),
		};

		return this.http.get(url, httpOptions).pipe(
			map(res => {
				return res;
			}),
			catchError(err => {
				console.log(err);
				Swal.fire(err.error.message, err.error.message, 'error');
				return throwError(err);
			})
		);
	}

	getUser(id: number) {
		let url = URL_SERVICIOS + `/users/${id}`;

		const httpOptions = {
			headers: new HttpHeaders({
				Authorization: `${this.token}`,
				'Content-Type': 'application/json',
			}),
		};

		return this.http.get(url, httpOptions).pipe(
			map(res => {
				return res;
			}),
			catchError(err => {
				console.log(err);
				Swal.fire(err.error.message, err.error.message, 'error');
				return throwError(err);
			})
		);
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
				Swal.fire('¡Eliminado!', 'El usuario ' + res.usuario.name + ' ha sido eliminado', 'success');
				return true;
			})
		);
	}

	changePassword(id: number, password: string) {
		let url = URL_SERVICIOS + '/users/password';

		const httpOptions = {
			headers: new HttpHeaders({
				Authorization: `${this.token}`,
				'Content-Type': 'application/json',
			}),
		};

		let user = {
			id,
			password,
		};

		return this.http.put(url, user, httpOptions).pipe(
			map(res => {
				console.log(res);
				Swal.fire({
					title: 'Contraseña actualizada',
					text: this.user.username,
					icon: 'success',
					onClose: () => {
						this.logout();
					},
				});

				return res;
			}),
			catchError(err => {
				console.log(err);
				Swal.fire(err.error.message, err.error.message, 'error');
				return throwError(err);
			})
		);
	}

	changeOtherPassword(id: number, password: string) {
		let url = URL_SERVICIOS + '/users/password';

		const httpOptions = {
			headers: new HttpHeaders({
				Authorization: `${this.token}`,
				'Content-Type': 'application/json',
			}),
		};

		let user = {
			id,
			password,
		};

		return this.http.put(url, user, httpOptions).pipe(
			map((res: any) => {
				console.log(res);
				Swal.fire({
					title: 'Contraseña actualizada',
					text: res.username,
					icon: 'success',
				});

				return res;
			}),
			catchError(err => {
				console.log(err);
				Swal.fire(err.error.message, err.error.message, 'error');
				return throwError(err);
			})
		);
	}
}
