import { LOGIN_DIRECTIVES } from './+login';
import { MainComponent } from './+main';
import { HOME_DIRECTIVES } from './+main/+home';
import { SHARED_DIRECTIVES } from './shared';

// All directives of the application
export const APP_DIRECTIVES: any = [
  LOGIN_DIRECTIVES,
  MainComponent,
  HOME_DIRECTIVES,
  SHARED_DIRECTIVES
];
