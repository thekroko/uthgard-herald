/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { RecentlyEarnedComponent } from './recently-earned.component';
import {CharacterProfile} from '../shared/character-profile.model';
import {mockPlayerProfiles} from '../shared/mock-character-profiles';

describe('RecentlyEarnedComponent', () => {
  let component: RecentlyEarnedComponent;
  let fixture: ComponentFixture<RecentlyEarnedComponent>;
  let character: CharacterProfile;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RecentlyEarnedComponent ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RecentlyEarnedComponent);
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
