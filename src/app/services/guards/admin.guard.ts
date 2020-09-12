import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { UserService } from '../user/user.service';

@Injectable({
	providedIn: 'root',
})
export class AdminGuard implements CanActivate {
	constructor(public userService: UserService, public router: Router) {}
	canActivate() {
		if (this.userService.user.role === 'ADMIN_ROLE') {
			return true;
		} else {
			console.log('Bloqueado por el admin guard');
			this.userService.logout();
			return false;
		}
	}
}
