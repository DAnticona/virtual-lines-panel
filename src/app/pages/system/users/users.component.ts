import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { User } from '../../../models/user.model';
import { UserService } from '../../../services/user/user.service';

@Component({
	selector: 'app-usuarios',
	templateUrl: './users.component.html',
	styles: [],
})
export class UsersComponent implements OnInit {
	users: any[] = [];
	desde: number = 0;

	totalRegistros: number = 0;
	loading: boolean = true;

	pages: number;
	pageNu: number;

	constructor(public userService: UserService, public router: Router) {
		this.pageNu = 1;
		this.pages = 1;
	}

	ngOnInit(): void {
		this.getStores(this.pageNu);
	}

	getStores(pageNu: number) {
		this.loading = true;
		this.userService.getUsers(pageNu).subscribe((res: any) => {
			this.pages = Math.ceil(res.count / 12);
			this.pageNu = pageNu;
			this.users = res.object;
			this.loading = false;
		});
	}

	search(term: string) {
		this.pageNu = 1;
		this.pages = 1;

		if (term) {
			this.loading = true;
			this.userService.searchByNameOrEmail(term).subscribe((res: any) => {
				this.users = res.object;
				this.loading = false;
			});
		} else {
			this.getStores(1);
		}
	}

	toggleActive(user: any, event: any) {
		if (user.store) {
			user.storeId = user.store.storeId;
		}
		user.roleId = user.role.roleId;
		const message = event.target.checked ? 'activar' : 'inactivar';

		Swal.fire({
			title: '¿Estas seguro?',
			text: `¿Quieres ${message} este usuario? ${user.email}`,
			icon: 'warning',
			showCancelButton: true,
			confirmButtonColor: '#3085d6',
			cancelButtonColor: '#d33',
			confirmButtonText: 'Sí, ¡Estoy seguro!',
		}).then(result => {
			if (result.value) {
				user.activeFg = event.target.checked ? 'S' : 'N';
				this.userService.updateUser(user).subscribe(res => {
					console.log(res);
				});
			} else {
				event.target.checked = !event.target.checked;
			}
		});
	}

	new() {
		this.router.navigate(['/user', 'new']);
	}
}
