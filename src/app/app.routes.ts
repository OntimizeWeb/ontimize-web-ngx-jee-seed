import { Routes, RouterModule } from '@angular/router';

import { LoginComponent } from './+login';
import { HomeComponent } from './+main/+home';
import { PrivateAppRoutes } from './+main/main.routes';

const LoginRoutes: Routes = [
  { path: 'login', component: LoginComponent }];

const PublicAppRoutes: Routes = [
  { path: 'home', component: HomeComponent }
];

// All routes of the application
const routes: Routes = [
  ...LoginRoutes,
  ...PublicAppRoutes,
  ...PrivateAppRoutes,
  { path: '', redirectTo: 'main', pathMatch: 'prefix' }
];

let opt = {
  enableTracing: false // true if you want to print navigation routes
};
export const routing = RouterModule.forRoot(routes, opt);

