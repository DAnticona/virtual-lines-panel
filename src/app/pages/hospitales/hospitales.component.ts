import { Component, OnInit } from '@angular/core';
import { Hospital } from '../../models/hospital.model';
import { ModalUploadService } from 'src/app/components/modal-upload/modal-upload.service';
import { HospitalService } from '../../services/hospital/hospital.service';
import Swal from 'sweetalert2';

@Component({
	selector: 'app-hospitales',
	templateUrl: './hospitales.component.html',
	styles: [],
})
export class HospitalesComponent implements OnInit {
	hospitales: Hospital[] = [];
	totalRegistros: number = 0;
	cargando: boolean = true;
	desde: number = 0;

	constructor(public hospitalService: HospitalService, public modalUploadService: ModalUploadService) {}

	ngOnInit(): void {
		this.cargarHospital();
		this.modalUploadService.notificacion.subscribe(res => this.cargarHospital());
	}

	cambiarDesde(valor: number) {
		let desde = this.desde + valor;
		if (desde >= this.totalRegistros) {
			return;
		}

		if (desde < 0) {
			return;
		}

		this.desde += valor;
		this.cargarHospital();
	}

	mostrarModal(id: string) {
		this.modalUploadService.mostrarModal('hospitales', id);
	}

	cargarHospital() {
		this.cargando = true;
		this.hospitalService.cargarHospitales(this.desde).subscribe((res: any) => {
			this.totalRegistros = res.total;
			this.hospitales = res.hospitales;
			this.cargando = false;
		});
	}

	buscarHospital(termino: string) {
		if (termino.length <= 0) {
			this.cargarHospital();
			return;
		}

		this.cargando = true;
		this.hospitalService.buscarHospital(termino).subscribe((hospitales: Hospital[]) => {
			this.hospitales = hospitales;
			this.cargando = false;
		});
	}

	borrarHospital(hospital: Hospital) {
		Swal.fire({
			title: '¿Estas seguro?',
			text: 'Está a punto de borrar el hospital: ' + hospital.nombre,
			icon: 'warning',
			showCancelButton: true,
			confirmButtonColor: '#3085d6',
			cancelButtonColor: '#d33',
			confirmButtonText: 'Sí, ¡Estoy seguro!',
		}).then(result => {
			if (result.value) {
				this.hospitalService.borrarHospital(hospital._id).subscribe(res => {
					this.cargarHospital();
				});
			}
		});
	}

	guardarHospital(hospital: Hospital) {
		this.hospitalService.actualizarHospital(hospital).subscribe();
	}

	crearHospital() {
		Swal.fire({
			title: 'Ingrese el nombre del nuevo hospital',
			input: 'text',
			inputAttributes: {
				autocapitalize: 'off',
			},
			showCancelButton: true,
			confirmButtonText: 'Crear',
			showLoaderOnConfirm: true,
			preConfirm: nombre => {
				// console.log(nombre);

				if (!nombre || nombre.length === 0) {
					return;
				}
				this.hospitalService.crearHospital(nombre).subscribe(res => console.log(res));
			},
		}).then(result => {
			this.cargarHospital();
		});
	}
}
