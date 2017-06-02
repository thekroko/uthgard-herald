/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TradeskillsComponent } from './tradeskills.component';
import {CharacterProfile} from '../shared/character-profile.model';
import {mockPlayerProfiles} from '../shared/mock-character-profiles';

describe('TradeskillsComponent', () => {
  let component: TradeskillsComponent;
  let fixture: ComponentFixture<TradeskillsComponent>;
  let character: CharacterProfile;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TradeskillsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TradeskillsComponent);
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
