import {provideRouter, RouterConfig}  from '@angular/router';
import {characterProfileRoutes} from './+character-profile/character-profile.routes';
import {homeRoutes} from './+home/home.routes';

const routes: RouterConfig = [
  ...characterProfileRoutes,
  ...homeRoutes,
];

export const appRouterProviders = [
  provideRouter(routes)
];
