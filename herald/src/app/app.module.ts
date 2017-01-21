import {NgModule}      from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {HttpModule} from '@angular/http';

import { AppComponent }  from './app.component';
import {routing} from './app.routes';
import {CharacterProfileComponent, ProgressComponent, PveKillsComponent, RaceClassKillsComponent, RecentlyEarnedComponent,
  RpRankingsComponent, RvrKillsComponent, SiegeStatsComponent, TradeskillsComponent
} from './+character-profile';
import {CharacterProfileService} from './+character-profile';
import {HomeComponent} from './+home';

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
    TradeskillsComponent],
  bootstrap: [AppComponent],     // root component
<<<<<<< HEAD
  providers: [CharacterProfileService]                    // services
=======
  providers: [CharacterProfileService,// services
    GuildProfileService,
  ]
>>>>>>> a983c4f72e447ec7c8852d92a749f7c13708c9a7
})
export class AppModule { }
