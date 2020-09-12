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
		this.docTypeService.getTypes().subscribe((res: any) => {
			console.log(res);
			this.docTypes = res;
		});

		this.roleService.getRoles().subscribe((res: any) => {
			console.log(res);
			this.roles = res;
		});

		this.activatedRoute.params.subscribe(params => {
			this.user.activeFg = this.active ? 'S' : 'N';
			if (params.id !== 'nuevo') {
				let id = Number(params.id);
				this.userService.getUser(id).subscribe((res: any) => {
					this.user = res;
					this.user.roleId = res.role.roleId;
					this.user.documentTypeId = res.docType.id;
				});
			}
		});
	}

	ngOnInit(): void {}

	activeValue(value: string) {
		console.log(value);
		this.user.activeFg = value;
	}

	guardar() {
		console.log(this.user);
		if (this.user.id) {
			this.userService.updateUser(this.user).subscribe((res: any) => {
				console.log(res);
				this.router.navigate(['/user', res.id]);
			});
		} else {
			this.userService.createUser(this.user).subscribe((res: any) => {
				console.log(res);
				this.router.navigate(['/user', res.id]);
			});
		}
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
