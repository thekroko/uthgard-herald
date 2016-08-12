import {Component, Input} from '@angular/core';
import {CharacterProfile} from '../shared/character-profile.model';

@Component({
  moduleId: module.id,
  selector: 'tradeskills-node',
  templateUrl: 'tradeskills.component.html',
  styleUrls: ['../character-profile.component.css',
    'tradeskills.component.css']
})
export class TradeskillsComponent {
  @Input()
  character: CharacterProfile;

  constructor() {
  }

}
