import { Component } from '@angular/core';
import { SettingsService } from './services/service.index';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: [],
})
export class AppComponent {
  title = 'app';
  constructor(public _ajustes: SettingsService) {}
}
