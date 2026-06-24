import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { App } from './app/app';
import { environment } from './environments/environment';

console.log('%c🚀 Structo App Environment Config:', 'color: #00ff00; font-weight: bold; font-size: 14px;');
console.log('Is Production:', environment.production);
console.log('API URL Absolute:', (environment as any).apiUrl);
bootstrapApplication(App, appConfig)
  .catch((err) => console.error(err));
