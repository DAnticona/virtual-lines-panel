import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { UsuarioService } from '../services/usuario/usuario.service';
import { Usuario } from '../models/usuario.model';

declare function init_plugins();
declare const gapi: any;
@Component({
	selector: 'app-login',
	templateUrl: './login.component.html',
	styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
	recuerdame = false;
	email: string;

	auth2: any;
	constructor(public router: Router, public usuarioService: UsuarioService) {}

	ngOnInit(): void {
		init_plugins();

		this.googleInit();

		this.email = localStorage.getItem('email') || '';
		if (this.email.length > 1) {
			this.recuerdame = true;
		}
	}

	googleInit() {
		console.log('googleInit');
		gapi.load('auth2', () => {
			this.auth2 = gapi.auth2.init({
				client_id: '722817922112-bpbbb8lof5fdkb9ge301904pofkicria.apps.googleusercontent.com',
				cookiepolicy: 'single_host_origin',
				scope: 'profile email',
			});

			this.attachSignin(document.getElementById('btnGoogle'));
		});
	}

	attachSignin(element) {
		this.auth2.attachClickHandler(element, {}, googleUser => {
			let profile = googleUser.getBasicProfile();
			// console.log(profile);
			let token = googleUser.getAuthResponse().id_token;
			this.usuarioService.loginGoogle(token).subscribe(() => (window.location.href = '#/dashboard'));
			// console.log(token);
		});
	}

	ingresar(forma: NgForm) {
		if (forma.invalid) {
			return;
		}

		let usuario = new Usuario(null, forma.value.email, forma.value.password);
		console.log('Entrando...');
		this.usuarioService.login(usuario, forma.value.recuerdame).subscribe(res => {
			console.log(res);
			this.router.navigate(['/dashboard']);
		});
		// console.log(forma.valid);
		// console.log(forma.value);
		// this.router.navigate(['/dashboard']);
	}
}
