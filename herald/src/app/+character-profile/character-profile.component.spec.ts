/* tslint:disable:no-unused-variable */

import { By }           from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import {
  beforeEach, beforeEachProviders,
  describe, xdescribe,
  expect, it, xit,
  async, inject
} from '@angular/core/testing';

import { CharacterProfileComponent } from './character-profile.component';

describe('Component: CharacterProfile', () => {
  it('should create an instance', () => {
    let component = new CharacterProfileComponent(null, null);
    expect(component).toBeTruthy();
  });
});
