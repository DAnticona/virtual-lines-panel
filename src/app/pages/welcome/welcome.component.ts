import { Component, OnInit } from '@angular/core';
import { User } from '../../models/user.model';
import { UserService } from '../../services/user/user.service';

@Component({
	selector: 'app-welcome',
	templateUrl: './welcome.component.html',
	styles: [],
})
export class WelcomeComponent implements OnInit {
	user: User;

	constructor(public userService: UserService) {
		this.user = userService.user;
	}

	ngOnInit(): void {}
}
