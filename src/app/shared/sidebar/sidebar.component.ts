import { Component } from '@angular/core';
import { UserService } from '../../services/user/user.service';
import { MenuService } from '../../services/menu/menu.service';

@Component({
	selector: 'app-sidebar',
	templateUrl: './sidebar.component.html',
	styles: [],
})
export class SidebarComponent {
	menus: any[] = [];
	constructor(public menuService: MenuService, public userService: UserService) {
		console.log(this.userService);
		this.menuService.getMenus().subscribe((res: any) => {
			this.menus = res.object;
		});
	}
}
