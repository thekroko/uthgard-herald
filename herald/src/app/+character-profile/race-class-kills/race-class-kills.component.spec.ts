/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import {DebugElement} from '@angular/core';

import { RaceClassKillsComponent } from './race-class-kills.component';
import {CharacterProfile} from '../shared/character-profile.model';
import {mockPlayerProfiles} from '../shared/mock-character-profiles';

describe('RaceClassKillsComponent', () => {
  let component: RaceClassKillsComponent;
  let fixture: ComponentFixture<RaceClassKillsComponent>;
  let character: CharacterProfile;
  let canvas: HTMLCanvasElement[];
  let emptyCanvasCode: string[];

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RaceClassKillsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RaceClassKillsComponent);
    component = fixture.componentInstance;
    canvas = [];
    emptyCanvasCode = [];

    for (let eleDebug of fixture.debugElement.queryAll(By.css('canvas')))
    {
      let eleCanvas: HTMLCanvasElement = eleDebug.nativeElement;
      canvas.push(eleCanvas);
      emptyCanvasCode.push(eleCanvas.toDataURL());
    }

    //provide mock character
    character = mockPlayerProfiles[0];
    component.character = character;

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have something drawn on the 1st canvas', () => {
    let canvasCode: string = canvas[0].toDataURL();
    expect(canvasCode === emptyCanvasCode[0]).toBe(false);
  });

  it('should have something drawn on the 2nd canvas', () => {
    let canvasCode: string = canvas[1].toDataURL();
    expect(canvasCode === emptyCanvasCode[1]).toBe(false);
  });

  it('should have something drawn on the 3rd canvas', () => {
    let canvasCode: string = canvas[2].toDataURL();
    expect(canvasCode === emptyCanvasCode[2]).toBe(false);
  });

  it('should have something drawn on the 4th canvas', () => {
    let canvasCode: string = canvas[3].toDataURL();
    expect(canvasCode === emptyCanvasCode[3]).toBe(false);
  });

});
