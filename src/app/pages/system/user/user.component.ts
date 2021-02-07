import { Component, OnInit } from '@angular/core';
import { UserService } from '../../../services/user/user.service';
import { ActivatedRoute, Router } from '@angular/router';
import { DocumentTypeService } from '../../../services/document-type/document-type.service';
import { RoleService } from '../../../services/role/role.service';

@Component({
	selector: 'app-user',
	templateUrl: './user.component.html',
	styles: [],
})
export class UserComponent implements OnInit {
	user: any = {};
	docTypes: any[] = [];
	roles: any[] = [];
	active = true;

	constructor(
		public userService: UserService,
		public activatedRoute: ActivatedRoute,
		public router: Router,
		public docTypeService: DocumentTypeService,
		public roleService: RoleService
	) {
		// this.roleService.getRoles().subscribe((res: any) => {
		// 	console.log(res);
		// 	this.roles = res;
		// });

		this.activatedRoute.params.subscribe(params => {
			this.user.activeFg = this.active ? 'S' : 'N';
			this.user.roleId = 4;
			this.user.storeFg = 'N';
		});
	}

	ngOnInit(): void {}

	activeValue(value: string) {
		console.log(value);
		this.user.activeFg = value;
	}

	guardar() {
		console.log(this.user);
		this.userService.createUser(this.user).subscribe((res: any) => {
			console.log(res);
		});
	}

	changePassword(password: string) {
		this.userService.changeOtherPassword(this.user.id, password).subscribe(res => {
			console.log(res);
		});
	}

	volver() {
		this.router.navigate(['/users']);
	}
}
