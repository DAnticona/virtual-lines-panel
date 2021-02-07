import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './login/register.component';
import { NopagefoundComponent } from './shared/nopagefound/nopagefound.component';
import { PagesComponent } from './pages/pages.component';
import { LoginGuardGuard } from './services/guards/login-guard.guard';
import { AdminGuard } from './services/guards/admin.guard';
import { UserActiveGuard } from './services/guards/user-active.guard';

const appRoutes: Routes = [
	{ path: 'login', component: LoginComponent },
	{ path: 'register', component: RegisterComponent },
	{
		path: '',
		component: PagesComponent,
		canActivate: [LoginGuardGuard, UserActiveGuard],
		loadChildren: () => import('./pages/pages.module').then(m => m.PagesModule),
	},
	{ path: '**', component: NopagefoundComponent },
];

export const APP_ROUTES = RouterModule.forRoot(appRoutes, { useHash: true });
