import { Submenu } from './submenu.model';
export class Menu {
	menuId: number;
	name: string;
	orderNu: number;
	icon: string;
	submenus: Submenu[];
}
