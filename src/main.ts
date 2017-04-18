import { enableProdMode } from '@angular/core';
import { ontimizeBootstrap } from 'ontimize-web-ng2/ontimize/MainLauncher';
import { AppModule, CONFIG } from './app/';

enableProdMode();

// Boostraping app...
ontimizeBootstrap(AppModule, CONFIG).then(appRef => {
  console.log('initialized... ');
});

