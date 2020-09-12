import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/user.model';
import { Router } from '@angular/router';
import { UserService } from '../../services/user/user.service';

@Component({
	selector: 'app-header',
	templateUrl: './header.component.html',
	styles: [],
})
export class HeaderComponent implements OnInit {
	constructor(public router: Router, public userService: UserService) {}

	ngOnInit(): void {}

	buscar(termino: string) {
		this.router.navigate(['/busqueda', termino]);
	}
}
