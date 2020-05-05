import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Hospital } from 'src/app/models/hospital.model';
import { MedicoService } from '../../services/medico/medico.service';
import { HospitalService } from '../../services/hospital/hospital.service';
import { Medico } from 'src/app/models/medico.model';
import { Router, ActivatedRoute } from '@angular/router';
import { ModalUploadService } from '../../components/modal-upload/modal-upload.service';

@Component({
	selector: 'app-medico',
	templateUrl: './medico.component.html',
	styles: [],
})
export class MedicoComponent implements OnInit {
	hospitales: Hospital[] = [];
	medico: Medico = new Medico('', '', '', '', '');
	hospital: Hospital = new Hospital('');

	constructor(
		public medicoService: MedicoService,
		public hospitalService: HospitalService,
		public router: Router,
		public activatedRoute: ActivatedRoute,
		public modalUploadServcice: ModalUploadService
	) {
		this.activatedRoute.params.subscribe(params => {
			let id = params['id'];
			if (id !== 'nuevo') {
				console.log('medico');
				this.cargarMedico(id);
			}
		});
	}

	ngOnInit(): void {
		this.hospitalService.cargarHospitales().subscribe((res: any) => (this.hospitales = res.hospitales));
		this.modalUploadServcice.notificacion.subscribe((res: any) => (this.medico.img = res.medico.img));
	}

	guardarMedico(f: NgForm) {
		if (f.invalid) {
			return;
		}

		this.medicoService.guardarMedico(this.medico).subscribe(medico => {
			this.medico._id = medico._id;
			this.router.navigate(['/medico', medico._id]);
		});
	}

	cambioHospital(id: string) {
		this.hospitalService.obtenerHospital(id).subscribe(hospital => (this.hospital = hospital));
	}

	cargarMedico(id: string) {
		this.medicoService.cargarMedico(id).subscribe(medico => {
			this.medico = medico;
			this.medico.hospital = medico.hospital._id;
			this.cambioHospital(this.medico.hospital);
		});
	}

	cambiarFoto() {
		this.modalUploadServcice.mostrarModal('medicos', this.medico._id);
	}
}
