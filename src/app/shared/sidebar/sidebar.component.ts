import { Component, OnInit } from '@angular/core';
import { SidebarService } from 'src/app/services/service.index';
import { User } from '../../models/user.model';
import { UserService } from '../../services/user/user.service';

@Component({
	selector: 'app-sidebar',
	templateUrl: './sidebar.component.html',
	styles: [],
})
export class SidebarComponent implements OnInit {
	constructor(public sidebarService: SidebarService, public userService: UserService) {}

	ngOnInit(): void {
		this.sidebarService.cargarMenu();
	}
}
