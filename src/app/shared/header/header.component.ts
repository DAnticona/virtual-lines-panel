import { Component, OnInit } from '@angular/core';
import { UsuarioService } from 'src/app/services/service.index';
import { User } from 'src/app/models/user.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styles: [],
})
export class HeaderComponent implements OnInit {
  usuario: User;
  constructor(public router: Router, public usuarioService: UsuarioService) {}

  ngOnInit(): void {
    this.usuario = this.usuarioService.usuario;
  }

  buscar(termino: string) {
    this.router.navigate(['/busqueda', termino]);
  }
}
