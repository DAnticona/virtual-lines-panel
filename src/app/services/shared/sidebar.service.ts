import { Injectable } from '@angular/core';
import { UserService } from '../user/user.service';
import { Menu } from '../../models/menu.model';

@Injectable({
	providedIn: 'root',
})
export class SidebarService {
	menus: Menu[] = [];
	constructor(public userService: UserService) {}

	cargarMenu() {
		this.menus = this.userService.menus;
	}
}
