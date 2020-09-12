import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { User } from '../models/user.model';
import { UserService } from '../services/user/user.service';

declare function init_plugins();

@Component({
	selector: 'app-login',
	templateUrl: './login.component.html',
	styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
	rememberme = false;
	username: string;

	constructor(public router: Router, public userService: UserService) {}

	ngOnInit(): void {
		init_plugins();

		this.username = localStorage.getItem('username') || '';
		if (this.username.length > 1) {
			this.rememberme = true;
		}
	}

	login(form: NgForm) {
		if (form.invalid) {
			return;
		}

		let user: any = {};
		user.username = form.value.username;
		user.password = form.value.password;

		this.userService.login(user, form.value.rememberme).subscribe(res => {
			console.log(res);
			this.router.navigate(['/welcome']);
		});
	}
}
