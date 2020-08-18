import { Component, OnInit } from '@angular/core';
import { SidebarService, UsuarioService } from 'src/app/services/service.index';
import { User } from '../../models/user.model';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styles: [],
})
export class SidebarComponent implements OnInit {
  usuario: User;
  constructor(public _sidebar: SidebarService, public usuarioService: UsuarioService) {}

  ngOnInit(): void {
    this.usuario = this.usuarioService.usuario;
    this._sidebar.cargarMenu();
  }
}
