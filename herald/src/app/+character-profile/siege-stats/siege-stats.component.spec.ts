/* tslint:disable:no-unused-variable */

import { By }           from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import {
  beforeEach, beforeEachProviders,
  describe, xdescribe,
  expect, it, xit,
  async, inject
} from '@angular/core/testing';

import { SiegeStatsComponent } from './siege-stats.component';

describe('Component: SiegeStats', () => {
  it('should create an instance', () => {
    let component = new SiegeStatsComponent();
    expect(component).toBeTruthy();
  });
});
