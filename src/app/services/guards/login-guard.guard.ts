import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { UserService } from '../user/user.service';

@Injectable({
	providedIn: 'root',
})
export class LoginGuardGuard implements CanActivate {
	constructor(public userService: UserService, public router: Router) {}
	canActivate(): boolean {
		if (this.userService.isLogged()) {
			// console.log('Logueado');
			return true;
		} else {
			console.log('Bloqueado x el guard');
			this.router.navigate(['/login']);
			return false;
		}
	}
}
