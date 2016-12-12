import {Routes}  from '@angular/router';
import {CharacterProfileComponent} from './character-profile.component';

export const characterProfileRoutes: Routes = [
  {
    path: 'character/:name',
    component: CharacterProfileComponent
  }

];
