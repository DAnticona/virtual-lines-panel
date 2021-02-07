import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';

@Injectable({
	providedIn: 'root',
})
export class SubirArchivoService {
	url = environment.url;

	constructor() {}

	subirArchivo(archivo: File, tipo: string, id: string) {
		return new Promise((resolve, reject) => {
			let formData = new FormData();
			let xhr = new XMLHttpRequest();

			formData.append('imagen', archivo, archivo.name);

			xhr.onreadystatechange = function () {
				// 4: Termina el proceso
				if (xhr.readyState === 4) {
					if (xhr.status === 200) {
						console.log('imagen subida');
						resolve(JSON.parse(xhr.response));
					} else {
						console.log('Fallo la subida');
						reject(xhr.response);
					}
				}
			};

			let url = this.url + '/upload/' + tipo + '/' + id;

			xhr.open('PUT', url, true);
			xhr.send(formData);
		});
	}

	loadUserImageFile(file: File, id: number) {
		return new Promise((resolve, reject) => {
			let formData = new FormData();
			let xhr = new XMLHttpRequest();

			formData.append('imagen', file, file.name);

			xhr.onreadystatechange = function () {
				// 4: Termina el proceso
				if (xhr.readyState === 4) {
					if (xhr.status === 200) {
						console.log('imagen subida');
						resolve(JSON.parse(xhr.response));
					} else {
						console.log('Fallo la subida');
						reject(xhr.response);
					}
				}
			};

			let url = this.url + `/users/image/${id}`;

			xhr.open('PUT', url, true);
			xhr.send(formData);
		});
	}
}
