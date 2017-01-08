import {Routes, RouterModule}  from '@angular/router';
import {ModuleWithProviders} from '@angular/core';
import {characterProfileRoutes} from './+character-profile/character-profile.routes';
import {homeRoutes} from './+home/home.routes';
import {guildProfileRoutes} from './+guild-profile/guild-profile.routes';

const routes: Routes = [
  ...characterProfileRoutes,
  ...homeRoutes,
  ...guildProfileRoutes,
];

export const routing: ModuleWithProviders = RouterModule.forRoot(routes);
