import { Component, OnInit } from '@angular/core';
import { User } from '../../../models/user.model';
import { UserService } from '../../../services/user/user.service';
import Swal from 'sweetalert2';
import { ModalUploadService } from '../../../components/modal-upload/modal-upload.service';
import { Router } from '@angular/router';

@Component({
	selector: 'app-usuarios',
	templateUrl: './users.component.html',
	styles: [],
})
export class UsersComponent implements OnInit {
	users: any[] = [];
	desde: number = 0;

	totalRegistros: number = 0;
	cargando: boolean = true;

	constructor(public userService: UserService, public router: Router) {}

	ngOnInit(): void {
		this.cargarUsuario();
	}

	cargarUsuario() {
		this.cargando = true;
		this.userService.getUsers().subscribe((res: any) => {
			console.log(res);
			this.totalRegistros = res.length;
			this.users = res;
			this.cargando = false;
		});
	}

	// cambiarDesde(valor: number) {
	// 	let desde = this.desde + valor;
	// 	if (desde >= this.totalRegistros) {
	// 		return;
	// 	}

	// 	if (desde < 0) {
	// 		return;
	// 	}

	// 	this.desde += valor;
	// 	this.cargarUsuario();
	// }

	// buscarUsuario(termino: string) {
	// 	if (termino.length <= 0) {
	// 		this.cargarUsuario();
	// 		return;
	// 	}

	// 	this.cargando = true;
	// 	this.userService.buscarUsuarios(termino).subscribe((usuarios: User[]) => {
	// 		this.usuarios = usuarios;
	// 		this.cargando = false;
	// 	});
	// }

	borrarUsuario(usuario: User) {
		if (usuario.id === this.userService.user.id) {
			Swal.fire({
				title: 'No puede eliminar usuario',
				text: 'No se puede eliminar a si mismo',
				icon: 'error',
			});

			return;
		}

		Swal.fire({
			title: '¿Estas seguro?',
			text: 'Está a punto de borrar a ' + usuario.name,
			icon: 'warning',
			showCancelButton: true,
			confirmButtonColor: '#3085d6',
			cancelButtonColor: '#d33',
			confirmButtonText: 'Sí, ¡Estoy seguro!',
		}).then(result => {
			if (result.value) {
				this.userService.borrarUsuario(usuario.id).subscribe(res => {
					this.cargarUsuario();
				});
			}
		});
	}

	nuevo() {
		this.router.navigate(['/user', 'nuevo']);
	}

	guardarUsuario(usuario: User) {
		this.userService.updateUser(usuario).subscribe();
	}

	choose(user: any) {
		console.log(user);
		if (user.id === this.userService.user.id) {
			this.router.navigate(['/perfil']);
		} else {
			this.router.navigate(['/user', user.id]);
		}
	}
}
