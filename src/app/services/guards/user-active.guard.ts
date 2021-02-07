import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { UserService } from '../user/user.service';
import Swal from 'sweetalert2';

@Injectable({
	providedIn: 'root',
})
export class UserActiveGuard implements CanActivate {
	constructor(private userService: UserService) {}

	canActivate(): Promise<boolean> {
		return new Promise((resolve, reject) => {
			this.userService.isActive(this.userService.user.email).subscribe(active => {
				if (active) {
					resolve(true);
				} else {
					Swal.fire(this.userService.user.email, 'Usuario inactivo.', 'error');
					this.userService.logout();
					resolve(false);
				}
			});
		});
	}
}
