import { NgModule } from '@angular/core';

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
import { UsuariosComponent } from './usuarios/usuarios.component';
import { HospitalesComponent } from './hospitales/hospitales.component';
import { MedicosComponent } from './medicos/medicos.component';
import { MedicoComponent } from './medicos/medico.component';
import { BusquedaComponent } from './busqueda/busqueda.component';

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
		UsuariosComponent,
		// ModalUploadComponent,
		HospitalesComponent,
		MedicosComponent,
		MedicoComponent,
		BusquedaComponent,
	],
	exports: [DashboardComponent, ProgressComponent, Graficas1Component],
	imports: [SharedModule, PAGES_ROUTES, FormsModule, ChartsModule, CommonModule, PipesModule],
})
export class PagesModule {}
