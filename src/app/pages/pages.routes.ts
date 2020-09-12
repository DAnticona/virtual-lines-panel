import { RouterModule, Routes } from '@angular/router';

import { ProfileComponent } from './profile/profile.component';
import { UsersComponent } from './system/users/users.component';
import { BusquedaComponent } from './busqueda/busqueda.component';
import { AdminGuard } from '../services/guards/admin.guard';
import { VerificaTokenGuard } from '../services/guards/verifica-token.guard';
import { WelcomeComponent } from './welcome/welcome.component';
import { ClientsComponent } from './masters/clients/clients.component';
import { ProductsComponent } from './masters/products/products.component';
import { InputsComponent } from './inventory/inputs/inputs.component';
import { SalesComponent } from './sales/sales/sales.component';
import { RolesComponent } from './system/roles/roles.component';
import { UserComponent } from './system/user/user.component';
import { MeasuresComponent } from './masters/measures/measures.component';
import { ClientComponent } from './masters/client/client.component';
import { RoleComponent } from './system/role/role.component';
import { ProductComponent } from './masters/product/product.component';
import { MeasureComponent } from './masters/measure/measure.component';
import { InputComponent } from './inventory/input/input.component';
import { SaleComponent } from './sales/sale/sale.component';

const pagesRoutes: Routes = [
	{
		path: 'welcome',
		component: WelcomeComponent,
		canActivate: [VerificaTokenGuard],
		data: { titulo: 'Bienvenido' },
	},
	{ path: 'perfil', component: ProfileComponent, data: { titulo: 'Mi Perfil' } },
	{ path: 'busqueda/:termino', component: BusquedaComponent, data: { titulo: 'Buscador' } },

	// Menu
	// Masters
	{ path: 'clients', component: ClientsComponent, data: { titulo: 'Clientes' } },
	{ path: 'clients/:id', component: ClientComponent, data: { titulo: 'Detalle del Cliente' } },
	{ path: 'products', component: ProductsComponent, data: { titulo: 'Productos' } },
	{ path: 'products/:id', component: ProductComponent, data: { titulo: 'Detalle del Producto' } },
	{ path: 'measures', component: MeasuresComponent, data: { titulo: 'Unidades de Medida' } },
	{ path: 'measures/:id', component: MeasureComponent, data: { titulo: 'Detalle de Unidad de Medida' } },
	// Inventory
	{ path: 'inputs', component: InputsComponent, data: { titulo: 'Ingreso de Productos' } },
	{ path: 'inputs/:id', component: InputComponent, data: { titulo: 'Lotes del Producto' } },
	// Sales
	{ path: 'sales', component: SalesComponent, data: { titulo: 'Ventas' } },
	{ path: 'sales/:id', component: SaleComponent, data: { titulo: 'Detalle de Venta' } },
	// System
	{
		path: 'users',
		component: UsersComponent,
		// canActivate: [AdminGuard],
		data: { titulo: 'Usuarios' },
	},
	{
		path: 'user/:id',
		component: UserComponent,
		// canActivate: [AdminGuard],
		data: { titulo: 'Detalle del Usuario' },
	},
	{ path: 'roles', component: RolesComponent, data: { titulo: 'Roles' } },
	{ path: 'role/:id', component: RoleComponent, data: { titulo: 'Detalle del Rol' } },

	// { path: 'dashboard', component: DashboardComponent, data: { titulo: 'Dashboard' } },
	// { path: 'progress', component: ProgressComponent, data: { titulo: 'Progress' } },
	// { path: 'graficas1', component: Graficas1Component, data: { titulo: 'Gráficas' } },
	// { path: 'promesas', component: PromesasComponent, data: { titulo: 'Promesas' } },
	// { path: 'rxjs', component: RxjsComponent, data: { titulo: 'RxJs' } },
	// { path: 'account-settings', component: AccountSettingsComponent, data: { titulo: 'Ajustes del Tema' } },
	// // Mantenimientos
	// { path: 'hospitales', component: HospitalesComponent, data: { titulo: 'Mantenimiento de Hospitales' } },
	// { path: 'medicos', component: MedicosComponent, data: { titulo: 'Mantenimiento de Medicos' } },
	// { path: 'medico/:id', component: MedicoComponent, data: { titulo: 'Actualizar Médico' } },
	{ path: '', redirectTo: '/welcome', pathMatch: 'full' },
];
export const PAGES_ROUTES = RouterModule.forChild(pagesRoutes);
