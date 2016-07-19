import {Component, Input} from '@angular/core';
import {CharacterProfile} from '../shared/character-profile.model';

@Component({
  moduleId: module.id,
  selector: 'recently-earned',
  templateUrl: 'recently-earned.component.html',
  styleUrls: ['../character-profile.component.css',
    'recently-earned.component.css']
})
export class RecentlyEarnedComponent {
  @Input()
  character: CharacterProfile;

  constructor() {
  }

}
