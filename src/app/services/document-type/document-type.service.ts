import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import Swal from 'sweetalert2';
import { UserService } from '../user/user.service';
import { environment } from '../../../environments/environment';

@Injectable({
	providedIn: 'root',
})
export class DocumentTypeService {
	url = environment.url;

	constructor(public userService: UserService, public http: HttpClient) {}

	getTypes() {
		let url = this.url + '/document-type';

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
