import { Component, OnInit } from '@angular/core';
import { User } from '../../models/user.model';
import { UsuarioService } from '../../services/usuario/usuario.service';
import Swal from 'sweetalert2';
import { ModalUploadService } from '../../components/modal-upload/modal-upload.service';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styles: [],
})
export class UsuariosComponent implements OnInit {
  usuarios: User[] = [];
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
    this.usuarioService.buscarUsuarios(termino).subscribe((usuarios: User[]) => {
      this.usuarios = usuarios;
      this.cargando = false;
    });
  }

  borrarUsuario(usuario: User) {
    if (usuario.id === this.usuarioService.usuario.id) {
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
        this.usuarioService.borrarUsuario(usuario.id).subscribe(res => {
          this.cargarUsuario();
        });
      }
    });
  }

  guardarUsuario(usuario: User) {
    this.usuarioService.actualizarUsuario(usuario).subscribe();
  }
}
