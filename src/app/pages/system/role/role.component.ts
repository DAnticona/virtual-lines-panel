import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { RoleService } from '../../../services/role/role.service';
import { MenuService } from '../../../services/menu/menu.service';
import { NgForm } from '@angular/forms';

@Component({
	selector: 'app-role',
	templateUrl: './role.component.html',
	styles: [],
})
export class RoleComponent implements OnInit {
	role: any = {};
	menus: any[] = [];
	assignedMenus: any[] = [];
	active = false;

	constructor(
		public activatedRoute: ActivatedRoute,
		public router: Router,
		public roleService: RoleService,
		public menuService: MenuService
	) {
		this.menuService.getMenus().subscribe((res: any) => {
			console.log(res);
			this.menus = res;
		});

		this.activatedRoute.params.subscribe(params => {
			if (params.id !== 'new') {
				let id = params.id;
				this.roleService.getRole(id).subscribe((res: any) => {
					console.log(res);
					this.role = res;
					this.role.id = res.roleId;
					this.assignedMenus = res.menus;
				});
			}
		});
	}

	ngOnInit(): void {}

	activeValue(value: string) {
		console.log(value);
		// this.role.activeFg = value;
	}

	remove(menu: any) {
		this.assignedMenus.splice(this.assignedMenus.indexOf(menu), 1);
	}

	add(menu: any) {
		console.log(menu.menuId);
		if (this.assignedMenus.filter(f => f.menuId === menu.menuId).length > 0) {
			return;
		}
		this.assignedMenus.push(menu);
	}

	guardar(form: NgForm) {
		if (form.invalid) {
			return;
		}
		this.role.menusId = this.assignedMenus.map(x => x.menuId);
		console.log(this.role);
		if (this.role.id) {
			this.roleService.updateRole(this.role).subscribe((res: any) => {
				console.log(res);
				this.router.navigate(['/role', res.roleId]);
			});
		} else {
			this.roleService.createRole(this.role).subscribe((res: any) => {
				console.log(res);
				this.router.navigate(['/role', res.roleId]);
			});
		}
	}

	volver() {
		this.router.navigate(['/roles']);
	}
}
