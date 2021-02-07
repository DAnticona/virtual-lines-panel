import { NgModule, LOCALE_ID } from '@angular/core';

import { SharedModule } from '../shared/shared.module';

import { FormsModule } from '@angular/forms';

import { DashboardComponent } from './dashboard/dashboard.component';
import { ProgressComponent } from './progress/progress.component';
import { Graficas1Component } from './graficas1/graficas1.component';
import { PAGES_ROUTES } from './pages.routes';

// temporal
import { IncrementadorComponent } from '../components/incrementador/incrementador.component';
import { GraficoDonaComponent } from '../components/grafico-dona/grafico-dona.component';

// PipeModule
import { PipesModule } from '../pipes/pipes.module';

// n2-charts
import { ChartsModule } from 'ng2-charts';
import { CommonModule } from '@angular/common';
import { AccountSettingsComponent } from './account-settings/account-settings.component';
import { PromesasComponent } from './promesas/promesas.component';
import { RxjsComponent } from './rxjs/rxjs.component';
import { ProfileComponent } from './profile/profile.component';
import { UsersComponent } from './system/users/users.component';
import { HospitalesComponent } from './hospitales/hospitales.component';
import { MedicosComponent } from './medicos/medicos.component';
import { MedicoComponent } from './medicos/medico.component';
import { BusquedaComponent } from './busqueda/busqueda.component';
import { WelcomeComponent } from './welcome/welcome.component';
import { RolesComponent } from './system/roles/roles.component';
import { AccessComponent } from './system/access/access.component';
import { ClientsComponent } from './masters/clients/clients.component';
import { InputsComponent } from './inventory/inputs/inputs.component';
import { ProductsComponent } from './masters/products/products.component';
import { SalesComponent } from './sales/sales/sales.component';
import { UserComponent } from './system/user/user.component';
import { MeasuresComponent } from './masters/measures/measures.component';
import { ClientComponent } from './masters/client/client.component';
import { RoleComponent } from './system/role/role.component';
import { ProductComponent } from './masters/product/product.component';
import { MeasureComponent } from './masters/measure/measure.component';
import { InputComponent } from './inventory/input/input.component';
import { SaleComponent } from './sales/sale/sale.component';
import { StoresComponent } from './masters/stores/stores.component';
import { CategoriesComponent } from './masters/categories/categories.component';
import { CategoryComponent } from './masters/category/category.component';

@NgModule({
	declarations: [
		DashboardComponent,
		ProgressComponent,
		Graficas1Component,
		IncrementadorComponent,
		GraficoDonaComponent,
		AccountSettingsComponent,
		PromesasComponent,
		RxjsComponent,
		ProfileComponent,
		UsersComponent,
		// ModalUploadComponent,
		HospitalesComponent,
		MedicosComponent,
		MedicoComponent,
		BusquedaComponent,
		WelcomeComponent,
		ClientsComponent,
		ProductsComponent,
		InputsComponent,
		SalesComponent,
		RolesComponent,
		AccessComponent,
		UserComponent,
		MeasuresComponent,
		ClientComponent,
		RoleComponent,
		ProductComponent,
		MeasureComponent,
		InputComponent,
		SaleComponent,
		StoresComponent,
		CategoriesComponent,
		CategoryComponent,
	],
	exports: [DashboardComponent, ProgressComponent, Graficas1Component],
	imports: [SharedModule, PAGES_ROUTES, FormsModule, ChartsModule, CommonModule, PipesModule],
})
export class PagesModule {}
