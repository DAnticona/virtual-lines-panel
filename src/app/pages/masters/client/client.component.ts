import { Component, OnInit } from '@angular/core';
import { ClientService } from '../../../services/clients/client.service';
import { ActivatedRoute, Router } from '@angular/router';
import { PersonTypeService } from '../../../services/person-type/person-type.service';
import { DocumentTypeService } from '../../../services/document-type/document-type.service';
import { PersonService } from 'src/app/services/person/person.service';
import { CompanyService } from '../../../services/company/company.service';

@Component({
	selector: 'app-client',
	templateUrl: './client.component.html',
	styles: [],
})
export class ClientComponent implements OnInit {
	client: any = {};
	company: any = {};
	person: any = {};
	companyTab = true;
	personTypes: any[] = [];
	docTypes: any[] = [];

	constructor(
		public clientService: ClientService,
		public activatedRoute: ActivatedRoute,
		public router: Router,
		public personType: PersonTypeService,
		public documentType: DocumentTypeService,
		public personService: PersonService,
		public companyService: CompanyService
	) {
		this.personType.getTypes().subscribe((res: any) => {
			console.log(res);
			this.personTypes = res;
		});

		this.documentType.getTypes().subscribe((res: any) => {
			console.log(res);
			this.docTypes = res;
		});

		this.activatedRoute.params.subscribe(params => {
			this.client.typeId = 1;
			this.client.documentTypeId = 1;
			if (params.id !== 'new') {
				let id = Number(params.id);

				this.clientService.getClientById(id).subscribe((res: any) => {
					console.log(res);
					this.client = res;
					this.client.id = res.clientId;
					this.client.typeId = res.type.typeId;
					this.client.typeId === 1 ? (this.companyTab = true) : (this.companyTab = false);

					if (this.client.company) {
						this.client.companyId = res.company.companyId;
						this.client.documentNu = res.company.documentNu;
						this.client.legalName = res.company.legalName;
						this.client.businessName = res.company.businessName;
					} else {
						this.client.personId = res.person.id;
						this.client.documentTypeId = res.person.docType.id;
						this.client.documentNu = res.person.documentNu;
						this.client.name = res.person.name;
						this.client.lastname = res.person.lastname;
						this.client.gender = res.person.gender;
						this.client.email = res.person.email;
					}
					console.log(this.client);
				});
			}
		});
	}

	ngOnInit(): void {}

	changePersonType() {
		console.log(this.client);
		this.companyTab = !this.companyTab;
	}

	searchByDocument(term: string) {
		this.clientService.seacrhClientByDocument(term).subscribe((res: any) => {
			console.log(res);
			if (res) {
				this.router.navigate(['/client', res.clientId]);
				return;
			} else {
				this.companyService.seacrhCompanyByDocument(term).subscribe((res1: any) => {
					console.log(res1);
					if (res1) {
						this.companyTab = true;
						this.client.typeId = 1;
						this.client.companyId = res1.companyId;
						this.client.documentNu = res1.documentNu;
						this.client.legalName = res1.legalName;
						this.client.businessName = res1.businessName;
					} else {
						this.personService.seacrhPersonByDocument(term).subscribe((res2: any) => {
							console.log(res2);
							if (res2) {
								this.companyTab = false;
								this.client.typeId = 2;
								this.client.personId = res2.id;
								this.client.documentTypeId = res2.docType.id;
								this.client.documentNu = res2.documentNu;
								this.client.name = res2.name;
								this.client.lastname = res2.lastname;
								this.client.gender = res2.gender;
								this.client.email = res2.email;
							} else {
								return;
							}
						});
					}
				});
			}
		});
	}

	guardar() {
		console.log(this.client);
		if (this.client.clientId) {
			this.clientService.updateClient(this.client).subscribe((res: any) => {
				console.log(res);
				this.router.navigate(['/client', res.clientId]);
			});
		} else {
			this.clientService.createClient(this.client).subscribe((res: any) => {
				console.log(res);
				this.router.navigate(['/client', res.clientId]);
			});
		}
	}

	volver() {
		this.router.navigate(['/clients']);
	}
}
