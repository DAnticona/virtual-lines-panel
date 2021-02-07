import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UserService } from '../user/user.service';
import { map, catchError } from 'rxjs/operators';
import Swal from 'sweetalert2';
import { throwError } from 'rxjs';
import { environment } from '../../../environments/environment';

@Injectable({
	providedIn: 'root',
})
export class SaleService {
	url = environment.url;

	constructor(public userService: UserService, public http: HttpClient) {}

	getSales(startDate: string, endDate: string) {
		let url = this.url + `/sales/from/${startDate}/to/${endDate}`;

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

	getSaleById(id: number) {
		let url = this.url + `/sales/${id}`;

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

	createSale(sale: any) {
		let url = this.url + `/sales`;

		const httpOptions = {
			headers: new HttpHeaders({
				Authorization: `${this.userService.token}`,
				'Content-Type': 'application/json',
			}),
		};

		return this.http.post(url, sale, httpOptions).pipe(
			map((res: any) => {
				Swal.fire({
					title: 'Venta registrada',
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

	anullSale(sale: any) {
		let url = this.url + `/sales/annull`;

		const httpOptions = {
			headers: new HttpHeaders({
				Authorization: `${this.userService.token}`,
				'Content-Type': 'application/json',
			}),
		};

		return this.http.put(url, sale, httpOptions).pipe(
			map((res: any) => {
				Swal.fire({
					title: 'Venta anulada',
					text: 'Los saldos han sido actualizado',
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
