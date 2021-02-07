import { Injectable } from '@angular/core';
import { User } from '../../models/user.model';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { map, catchError } from 'rxjs/operators';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import { SubirArchivoService } from '../subir-archivo/subir-archivo.service';
import { Observable, throwError } from 'rxjs';
import { Menu } from '../../models/menu.model';
import { environment } from '../../../environments/environment';

@Injectable({
	providedIn: 'root',
})
export class UserService {
	url = environment.url;

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
			localStorage.setItem('email', user.email);
		} else {
			localStorage.removeItem('email');
		}

		let url = this.url + '/login';

		return this.http.post(url, user).pipe(
			map((res: any) => {
				console.log(res);
				this.user = res.object;
				// this.menus = res.user.role.menus;
				this.token = res.object.token;

				// this.menus.sort((a, b) => a.orderNu - b.orderNu);
				// for (let menu of this.menus) {
				// 	menu.submenus.sort((a, b) => a.orderNu - b.orderNu);
				// }

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
	// 	let url = this.url + '/login/renuevatoken';
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
		let url = this.url + '/user';

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
					text: user.email,
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
		let url = this.url + '/user';

		const httpOptions = {
			headers: new HttpHeaders({
				Authorization: `${this.token}`,
				'Content-Type': 'application/json',
			}),
		};

		return this.http.post(url, user, httpOptions).pipe(
			map((res: any) => {
				console.log(res);
				if (user.userId === this.user.userId) {
					this.user = res.object;
					this.saveStorage(this.user, this.token, this.menus);
				}

				Swal.fire({
					title: user.name,
					text: 'Usuario actualizado',
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

	cambiarImagen(file: File, userId: string) {
		this.loadUserImageFile(file, userId)
			.then((res: any) => {
				this.user.image = res.image;
				Swal.fire({
					title: 'Imagen actualizada',
					text: this.user.name,
					icon: 'success',
				});

				this.saveStorage(res.object, this.token, this.menus);
			})
			.catch(res => {
				console.log(res);
			});
	}

	getUsers(page: number) {
		let url = this.url + `/user/slice/${page}`;

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

	getUser(email: number) {
		let url = this.url + `/user/${email}`;

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
		let url = this.url + '/busqueda/coleccion/usuarios/' + termino;
		return this.http.get(url).pipe(map((res: any) => res.usuarios));
	}

	borrarUsuario(id: string) {
		let url = this.url + '/usuario/' + id;
		url += '?token=' + this.token;

		return this.http.delete(url).pipe(
			map((res: any) => {
				Swal.fire('¡Eliminado!', 'El usuario ' + res.usuario.name + ' ha sido eliminado', 'success');
				return true;
			})
		);
	}

	changePassword(userId: string, password: string) {
		let url = this.url + '/user/password';

		const httpOptions = {
			headers: new HttpHeaders({
				Authorization: `${this.token}`,
				'Content-Type': 'application/json',
			}),
		};

		let user = {
			userId,
			password,
		};

		return this.http.post(url, user, httpOptions).pipe(
			map(res => {
				console.log(res);
				Swal.fire({
					title: 'Contraseña actualizada',
					text: this.user.email,
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
		let url = this.url + '/users/password';

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
					text: res.email,
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

	loadUserImageFile(file: File, userId: string) {
		return new Promise((resolve, reject) => {
			let formData = new FormData();
			let xhr = new XMLHttpRequest();

			formData.append('file', file, file.name);
			formData.append('userId', userId);

			xhr.onreadystatechange = () => {
				// 4: Termina el proceso
				if (xhr.readyState === 4) {
					if (xhr.status === 200) {
						console.log('imagen subida');
						resolve(JSON.parse(xhr.response));
					} else {
						console.log('Fallo la subida');
						reject(xhr.response);
					}
				}
			};

			let url = this.url + `/user/avatar`;

			xhr.open('POST', url, true);
			xhr.setRequestHeader('Authorization', this.token);
			xhr.send(formData);
		});
	}

	searchByNameOrEmail(term: string) {
		const url = `${this.url}/user/search/${term}`;

		const httpOptions = {
			headers: new HttpHeaders({
				Authorization: `${this.token}`,
				'Content-Type': 'application/json',
			}),
		};

		return this.http.get(url, httpOptions);
	}

	isActive(email: string) {
		const url = `${this.url}/user/${email}`;

		const httpOptions = {
			headers: new HttpHeaders({
				Authorization: `${this.token}`,
				'Content-Type': 'application/json',
			}),
		};

		return this.http.get(url, httpOptions).pipe(
			map((res: any) => {
				return res.object.activeFg === 'S';
			})
		);
	}
}
