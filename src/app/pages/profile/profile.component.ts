import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user/user.service';
import { DocumentTypeService } from '../../services/document-type/document-type.service';
import { NgForm } from '@angular/forms';
import Swal from 'sweetalert2';

@Component({
	selector: 'app-profile',
	templateUrl: './profile.component.html',
	styles: [],
})
export class ProfileComponent implements OnInit {
	user: any = {};
	equals = false;
	docTypes: any[] = [];
	imagenSubir: File;
	imageTmp: string | ArrayBuffer;

	constructor(public userService: UserService, public docTypeService: DocumentTypeService) {
		this.docTypeService.getTypes().subscribe((res: any) => {
			console.log(res);
			this.docTypes = res;
		});

		this.userService.getUser(this.userService.user.id).subscribe((res: any) => {
			console.log(res);
			this.user = res;
			this.user.roleId = res.role.roleId;
			this.user.documentTypeId = res.docType.id;
		});
	}

	ngOnInit(): void {}

	guardar(form: NgForm) {
		console.log(this.user);
		this.userService.updateUser(this.user).subscribe(res => {
			console.log(res);
		});
	}

	seleccionImagen(file: File) {
		console.log('Buscar Nueva Imagen');
		if (!file) {
			this.imagenSubir = null;
			return;
		}

		if (file.type.indexOf('image') < 0) {
			Swal.fire({
				title: 'No es una imagen',
				text: 'El archivo no es una imagen',
				icon: 'error',
			});
			this.imagenSubir = null;
			return;
		}

		this.imagenSubir = file;

		let reader = new FileReader();
		let urlImagenTemp = reader.readAsDataURL(file);

		reader.onloadend = () => (this.imageTmp = reader.result);
	}

	cambiarImagen() {
		console.log(this.user);
		this.userService.cambiarImagen(this.imagenSubir, this.user.id);
	}

	changePassword(password: string) {
		if (!this.equals) {
			console.log('Las contraseñas no son iguales');
			return;
		}
		this.userService.changePassword(this.user.id, password).subscribe(res => {
			console.log(res);
		});
	}

	checkPassword(password1: string, password2: string) {
		if (!password1 || password1 !== password2) {
			this.equals = false;
			return;
		}
		this.equals = true;
	}
}
