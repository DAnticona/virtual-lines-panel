import { Injectable } from '@angular/core';
import { UserService } from '../user/user.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map, catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';
import Swal from 'sweetalert2';
import { environment } from '../../../environments/environment';

@Injectable({
	providedIn: 'root',
})
export class StockService {
	url = environment.url;

	constructor(public userService: UserService, public http: HttpClient) {}

	getStocksBiggerThanZero() {
		let url = this.url + `/stocks/bigger`;

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

	getStocksByProductId(id: number) {
		let url = this.url + `/stocks/product/${id}`;

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

	getStockById(productId: number, stockId: number) {
		let url = this.url + `/stocks/product/${productId}/stock/${stockId}`;

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

	createStock(stock: any) {
		let url = this.url + `/stocks`;

		const httpOptions = {
			headers: new HttpHeaders({
				Authorization: `${this.userService.token}`,
				'Content-Type': 'application/json',
			}),
		};

		return this.http.post(url, stock, httpOptions).pipe(
			map((res: any) => {
				Swal.fire({
					title: 'Lote registrado',
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

	updateStock(stock: any) {
		let url = this.url + `/stocks`;

		const httpOptions = {
			headers: new HttpHeaders({
				Authorization: `${this.userService.token}`,
				'Content-Type': 'application/json',
			}),
		};

		return this.http.put(url, stock, httpOptions).pipe(
			map((res: any) => {
				Swal.fire({
					title: 'Lote actualizado',
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
}
