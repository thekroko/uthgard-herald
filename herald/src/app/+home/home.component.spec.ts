/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { HomeComponent } from './home.component';
import { DataTableComponent } from '../shared/data-table/data-table.component';
import {Observable} from 'rxjs';
import {PlayerSearchService} from '../shared/player-search.service';
import {GuildSearchService} from '../shared/guild-search.service';
import {SmallPlayerDataService} from '../shared/small-player-data.service';
import {SmallPlayerData} from '../shared/player-data/small-player-data';

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HomeComponent, DataTableComponent ],
      providers: [ {provide: PlayerSearchService, useClass: PlayerSearchServiceStub},
                   {provide: GuildSearchService, useClass: GuildSearchServiceStub},
                   {provide: SmallPlayerDataService, useClass: SmallPlayerDataServiceStub} ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  //todo probably add a test for the search result
});

class PlayerSearchServiceStub {
  doPlayerSearch(searchName: string): Observable<string[]> {
    let mockResults = ['PlayerOne', 'PlayerTwo', searchName];
    return Observable.of(mockResults);
  }
}

class GuildSearchServiceStub {
    doGuildSearch(searchName: string): Observable<string[]> {
        let mockResults = ['WhatGuild', 'Amazing', searchName];
        return Observable.of(mockResults);
    }
}

class SmallPlayerDataServiceStub {
  getPlayerData(playerName: string): Observable<SmallPlayerData> {
    return Observable.of(new SmallPlayerData(playerName, 'Norseman', 'Shaman', 11, 10, 5, 3.1, 'midgard'));
  }
}
