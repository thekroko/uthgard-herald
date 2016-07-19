import {RouterConfig}  from '@angular/router';
import {CharacterProfileComponent} from './character-profile.component';

export const characterProfileRoutes: RouterConfig = [
  {
    path: 'character/:name',
    component: CharacterProfileComponent
  }

];
