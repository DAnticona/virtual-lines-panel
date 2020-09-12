import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

// Rutas
import { APP_ROUTES } from './app.routes';

import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './login/register.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
// import { ServiceModule } from './services/service.module';
import { HttpClientModule } from '@angular/common/http';
import { PagesComponent } from './pages/pages.component';
import { SharedModule } from './shared/shared.module';
import { ServiceModule } from './services/service.module';

@NgModule({
	declarations: [AppComponent, LoginComponent, RegisterComponent, PagesComponent],
	imports: [
		BrowserModule,
		SharedModule,
		FormsModule,
		HttpClientModule,
		ServiceModule,
		ReactiveFormsModule,
		APP_ROUTES,
	],
	providers: [],
	bootstrap: [AppComponent],
})
export class AppModule {}
