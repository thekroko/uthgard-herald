import {NgModule}      from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {HttpModule} from '@angular/http';

import { AppComponent }  from './app.component';
import {routing} from './app.routes';
import {CharacterProfileComponent, ProgressComponent, PveKillsComponent, RaceClassKillsComponent, RecentlyEarnedComponent,
  RpRankingsComponent, RvrKillsComponent, SiegeStatsComponent, TradeskillsComponent
} from './+character-profile';
import {GuildProfileComponent} from './+guild-profile/guild-profile.component';
import {CharacterProfileService} from './+character-profile';
import {DataTableComponent} from './shared/data-table/data-table.component';
import {GuildProfileService} from './+guild-profile/shared/guild-profile.service';
import {HomeComponent} from './+home';
import {SmallPlayerDataService} from './shared/small-player-data.service';
import {PlayerSearchService} from './shared/player-search.service';

@NgModule({
  imports: [BrowserModule, routing, HttpModule],       // module dependencies
  declarations: [AppComponent,    // components and directives
    CharacterProfileComponent,
    HomeComponent,
    ProgressComponent,
    PveKillsComponent,
    RaceClassKillsComponent,
    RecentlyEarnedComponent,
    RpRankingsComponent,
    RvrKillsComponent,
    SiegeStatsComponent,
    TradeskillsComponent,
    GuildProfileComponent,
    DataTableComponent,
  ],
  bootstrap: [AppComponent],     // root component
  providers: [CharacterProfileService, // services
    GuildProfileService,
    SmallPlayerDataService,
    PlayerSearchService,
  ]
})
export class AppModule { }
