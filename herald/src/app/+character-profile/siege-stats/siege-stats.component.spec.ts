/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SiegeStatsComponent } from './siege-stats.component';
import {CharacterProfile} from '../shared/character-profile.model';
import {mockPlayerProfiles} from '../shared/mock-character-profiles';

describe('SiegeStatsComponent', () => {
  let component: SiegeStatsComponent;
  let fixture: ComponentFixture<SiegeStatsComponent>;
  let character: CharacterProfile;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SiegeStatsComponent ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SiegeStatsComponent);
    component = fixture.componentInstance;

    //provide mock character
    character = mockPlayerProfiles[0];
    component.character = character;

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
