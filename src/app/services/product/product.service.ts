import { Injectable } from '@angular/core';
import { UserService } from '../user/user.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map, catchError } from 'rxjs/operators';
import Swal from 'sweetalert2';
import { throwError } from 'rxjs';
import { environment } from '../../../environments/environment';

@Injectable({
	providedIn: 'root',
})
export class ProductService {
	url = environment.url;

	constructor(public userService: UserService, public http: HttpClient) {}

	getProducts(pageNumber: number) {
		let url = this.url + `/products/slice/${pageNumber}`;

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

	getProductById(id: number) {
		let url = this.url + `/products/${id}`;

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

	createProduct(product: any) {
		let url = this.url + `/products`;

		const httpOptions = {
			headers: new HttpHeaders({
				Authorization: `${this.userService.token}`,
				'Content-Type': 'application/json',
			}),
		};

		return this.http.post(url, product, httpOptions).pipe(
			map((res: any) => {
				Swal.fire({
					title: 'Producto registrado',
					text: res.name,
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

	updateProduct(product: any) {
		let url = this.url + `/products`;

		const httpOptions = {
			headers: new HttpHeaders({
				Authorization: `${this.userService.token}`,
				'Content-Type': 'application/json',
			}),
		};

		return this.http.put(url, product, httpOptions).pipe(
			map((res: any) => {
				Swal.fire({
					title: 'Producto actualizado',
					text: product.documentNu,
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

	seacrhProductByName(term: string) {
		let url = this.url + `/products/search/${term}`;

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
}
