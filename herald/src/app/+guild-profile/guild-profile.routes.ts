import {Routes}  from '@angular/router';
import {GuildProfileComponent} from './guild-profile.component';

export const guildProfileRoutes: Routes = [
  {
    path: 'guild/:name',
    component: GuildProfileComponent
  }

];
