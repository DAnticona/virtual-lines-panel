import { Pipe, PipeTransform } from '@angular/core';
import { URL_SERVICIOS } from '../config/config';

@Pipe({
	name: 'image',
})
export class ImagePipe implements PipeTransform {
	transform(image: string): any {
		if (!image) {
			return './assets/images/users/noimage2.jpg';
		}
		return image;
	}
}
