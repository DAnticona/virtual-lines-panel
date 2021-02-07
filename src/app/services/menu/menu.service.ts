import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import Swal from 'sweetalert2';
import { UserService } from '../user/user.service';
import { environment } from '../../../environments/environment';

@Injectable({
	providedIn: 'root',
})
export class MenuService {
	url = environment.url;
	menuPath = environment.menu;

	constructor(public userService: UserService, public http: HttpClient) {}

	getMenus() {
		let url = this.url + '/menus';

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
	// getMenuOptions() {
	// 	return this.http.get<any[]>(this.menuPath).pipe(
	// 		map((res: any[]) => {
	// 			const menus: any[] = [];
	// 			res.forEach(menu => {
	// 				menu.roles.forEach(role => {
	// 					if (role.roleId === this.userService.user.role.roleId) {
	// 						menus.push(menu);
	// 					}
	// 				});
	// 			});
	// 			return menus;
	// 		})
	// 	);
	// }
}
