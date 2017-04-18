import { NgModule } from '@angular/core';

import {
  ONTIMIZE_MODULES,
  ONTIMIZE_DIRECTIVES,
  ontimizeProviders,
  ODialogComponent
} from 'ontimize-web-ng2/ontimize';

import { CONFIG } from './app.config';
import { AppComponent } from './app.component';
import { routing } from './app.routes';
import { APP_DIRECTIVES } from './app.directives';

// Standard providers...
let standardProviders = ontimizeProviders({
  'config': CONFIG
});
// Defining custom providers (if needed)...
// let customProviders = [
// ];

@NgModule({
  imports: [
    ONTIMIZE_MODULES,
    routing
  ],
  declarations: [
    AppComponent,
    ONTIMIZE_DIRECTIVES,
    ...APP_DIRECTIVES
  ],
  entryComponents: [
    ODialogComponent
  ],
  bootstrap: [
    AppComponent
  ],
  providers: [
    ...standardProviders
    // ...customProviders
  ]
})
export class AppModule { }

