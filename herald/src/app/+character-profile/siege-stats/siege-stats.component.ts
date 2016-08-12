import {Component, Input} from '@angular/core';
import {CharacterProfile} from '../shared/character-profile.model';

@Component({
  moduleId: module.id,
  selector: 'siege-stats',
  templateUrl: 'siege-stats.component.html',
  styleUrls: ['../character-profile.component.css',
              'siege-stats.component.css']
})
export class SiegeStatsComponent {
  @Input()
  character: CharacterProfile;

  constructor() {}

}
