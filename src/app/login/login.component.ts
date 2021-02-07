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
	email: string;

	constructor(public router: Router, public userService: UserService) {}

	ngOnInit(): void {
		init_plugins();

		this.email = localStorage.getItem('email') || '';
		if (this.email.length > 1) {
			this.rememberme = true;
		}
	}

	login(form: NgForm) {
		if (form.invalid) {
			return;
		}

		let user: any = {};
		user.email = form.value.email;
		user.password = form.value.password;

		this.userService.login(user, form.value.rememberme).subscribe(res => {
			console.log(res);
			this.router.navigate(['/welcome']);
		});
	}
}
