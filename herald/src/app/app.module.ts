import {NgModule}      from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import { AppComponent }  from './app.component';
import {routing} from './app.routes';
import {CharacterProfileComponent, ProgressComponent, PveKillsComponent, RaceClassKillsComponent, RecentlyEarnedComponent,
  RpRankingsComponent, RvrKillsComponent, SiegeStatsComponent, TradeskillsComponent
} from './+character-profile';
import {GuildProfileComponent} from './+guild-profile/guild-profile.component';
import {CharacterProfileService} from './+character-profile';
import {GuildProfileService} from './+guild-profile/shared/guild-profile.service';
import {HomeComponent} from './+home';

@NgModule({
  imports: [BrowserModule, routing],       // module dependencies
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
  ],
  bootstrap: [AppComponent],     // root component
  providers: [CharacterProfileService,
             GuildProfileService]                    // services
})
export class AppModule { }
