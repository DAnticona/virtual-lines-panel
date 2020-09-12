import { Component, OnInit } from '@angular/core';
import { RoleService } from '../../../services/role/role.service';
import { Router } from '@angular/router';

@Component({
	selector: 'app-roles',
	templateUrl: './roles.component.html',
	styles: [],
})
export class RolesComponent implements OnInit {
	cargando = true;
	roles: any[] = [];

	constructor(public roleService: RoleService, public router: Router) {
		this.roleService.getRoles().subscribe((res: any) => {
			console.log(res);
			this.roles = res;
			this.cargando = false;
		});
	}

	ngOnInit(): void {}

	choose(role: any) {
		console.log(role);
		this.router.navigate(['/role', role.roleId]);
	}

	new() {
		this.router.navigate(['/role', 'new']);
	}
}
