import { Injectable, ResolvedReflectiveFactory } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { UsuarioService } from '../usuario/usuario.service';

@Injectable({
	providedIn: 'root',
})
export class VerificaTokenGuard implements CanActivate {
	constructor(public usuarioService: UsuarioService, public router: Router) {}
	canActivate(): Promise<boolean> | boolean {
		console.log('Inicio de verifica token guard');

		let token = this.usuarioService.token;
		let payload = JSON.parse(atob(token.split('.')[1]));
		console.log(payload);
		let expirado = this.expirado(payload.exp);
		console.log('expirado', expirado);

		if (expirado) {
			this.usuarioService.logout();
			return false;
		}

		return this.verificaRenueva(payload.exp);
		// return true;
	}

	verificaRenueva(fechaExp: number): Promise<boolean> {
		return new Promise((resolve, reject) => {
			let tokenExp = new Date(fechaExp * 1000);
			let ahora = new Date(); // deberia ser de la bd
			console.log('tokenExp', tokenExp);
			console.log('ahora', ahora);

			ahora.setTime(ahora.getTime() + 4 * 60 * 60 * 1000);

			console.log('token', tokenExp.getTime());
			console.log('ahora', ahora.getTime());

			if (tokenExp.getTime() > ahora.getTime()) {
				resolve(true);
			} else {
				this.usuarioService.renuevaToken().subscribe(
					() => {
						resolve(true);
					},
					() => {
						this.usuarioService.logout();
						reject(true);
					}
				);
			}
		});
	}

	expirado(fechaExp: number) {
		let ahora = new Date().getTime() / 1000; // De milisengundos a segundos (1000)
		if (fechaExp < ahora) {
			return true;
		} else {
			return false;
		}
	}
}
