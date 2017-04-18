import { Routes } from '@angular/router';
import { AuthGuardService } from 'ontimize-web-ng2/ontimize';

import { MainComponent } from './main.component';
import { HomeRoutes } from './+home/home.routes';


export const PrivateAppRoutes: Routes = [
  {
    path: 'main', component: MainComponent,
    canActivate: [AuthGuardService],
    children: [
      ...HomeRoutes,
      { path: '', redirectTo: 'home', pathMatch: 'full' }
    ]
  }
];



