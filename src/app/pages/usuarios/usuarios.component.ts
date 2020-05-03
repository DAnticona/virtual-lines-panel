import { Component, OnInit } from '@angular/core';
import { Usuario } from '../../models/usuario.model';
import { UsuarioService } from '../../services/usuario/usuario.service';
import Swal from 'sweetalert2';
import { ModalUploadService } from '../../components/modal-upload/modal-upload.service';

@Component({
	selector: 'app-usuarios',
	templateUrl: './usuarios.component.html',
	styles: [],
})
export class UsuariosComponent implements OnInit {
	usuarios: Usuario[] = [];
	desde: number = 0;

	totalRegistros: number = 0;
	cargando: boolean = true;

	constructor(public usuarioService: UsuarioService, public modalUploadService: ModalUploadService) {}

	ngOnInit(): void {
		this.cargarUsuario();
		this.modalUploadService.notificacion.subscribe(res => this.cargarUsuario());
	}

	mostrarModal(id: string) {
		this.modalUploadService.mostrarModal('usuarios', id);
	}

	cargarUsuario() {
		this.cargando = true;
		this.usuarioService.cargarUsuarios(this.desde).subscribe((res: any) => {
			this.totalRegistros = res.total;
			this.usuarios = res.usuarios;
			this.cargando = false;
		});
	}

	cambiarDesde(valor: number) {
		let desde = this.desde + valor;
		if (desde >= this.totalRegistros) {
			return;
		}

		if (desde < 0) {
			return;
		}

		this.desde += valor;
		this.cargarUsuario();
	}

	buscarUsuario(termino: string) {
		if (termino.length <= 0) {
			this.cargarUsuario();
			return;
		}

		this.cargando = true;
		this.usuarioService.buscarUsuarios(termino).subscribe((usuarios: Usuario[]) => {
			this.usuarios = usuarios;
			this.cargando = false;
		});
	}

	borrarUsuario(usuario: Usuario) {
		if (usuario._id === this.usuarioService.usuario._id) {
			Swal.fire({
				title: 'No puede eliminar usuario',
				text: 'No se puede eliminar a si mismo',
				icon: 'error',
			});

			return;
		}

		Swal.fire({
			title: '¿Estas seguro?',
			text: 'Está a punto de borrar a ' + usuario.nombre,
			icon: 'warning',
			showCancelButton: true,
			confirmButtonColor: '#3085d6',
			cancelButtonColor: '#d33',
			confirmButtonText: 'Sí, ¡Estoy seguro!',
		}).then(result => {
			if (result.value) {
				this.usuarioService.borrarUsuario(usuario._id).subscribe(res => {
					this.cargarUsuario();
				});
			}
		});
	}

	guardarUsuario(usuario: Usuario) {
		this.usuarioService.actualizarUsuario(usuario).subscribe();
	}
}
