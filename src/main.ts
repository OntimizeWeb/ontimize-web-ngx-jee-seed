import 'hammerjs';
import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';
import { environment } from './environments/environment';

import { ontimizePostBootstrap } from 'ontimize-web-ngx';

if (environment.production) {
  enableProdMode();
}

const promise = platformBrowserDynamic().bootstrapModule(AppModule);
promise.then(ontimizePostBootstrap).catch(err => {
  console.error(err.message);
});
