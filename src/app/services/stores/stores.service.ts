import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment.prod';
import { UserService } from '../user/user.service';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { map, catchError } from 'rxjs/operators';
import Swal from 'sweetalert2';
import { throwError } from 'rxjs';

@Injectable({
	providedIn: 'root',
})
export class StoresService {
	url = environment.url;

	constructor(public http: HttpClient, public userService: UserService) {}

	getStores(page: number) {
		let url = this.url + `/store/slice/${page}`;

		const httpOptions = {
			headers: new HttpHeaders({
				Authorization: `${this.userService.token}`,
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

	searchStoresByName(term: string) {
		const url = `${this.url}/store/search/${term}`;

		const httpOptions = {
			headers: new HttpHeaders({
				Authorization: `${this.userService.token}`,
				'Content-Type': 'application/json',
			}),
		};

		return this.http.get(url, httpOptions);
	}

	updateStore(store: any) {
		const url = `${this.url}/store`;

		const httpOptions = {
			headers: new HttpHeaders({
				Authorization: `${this.userService.token}`,
				'Content-Type': 'application/json',
			}),
		};

		return this.http.put(url, store, httpOptions).pipe(
			map((res: any) => {
				Swal.fire(store.publicName, 'Establecimiento actualizado', 'success');
				return true;
			}),
			catchError(err => {
				console.log(err);
				Swal.fire(err.error.message, err.error.message, 'error');
				return throwError(err);
			})
		);
	}

	getStoresByCategory(categoryId) {
		const url = `${this.url}/store/category/${categoryId}`;

		const httpOptions = {
			headers: new HttpHeaders({
				Authorization: `${this.userService.token}`,
				'Content-Type': 'application/json',
			}),
		};

		return this.http.get(url, httpOptions);
	}
}
