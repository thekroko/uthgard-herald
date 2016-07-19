import {Component, OnInit, OnDestroy} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {CharacterProfileService} from './shared/character-profile.service';
import {CharacterProfile} from './shared';
import {ISubscription} from 'rxjs/Subscription';
import {SiegeStatsComponent} from './siege-stats';
import {RecentlyEarnedComponent} from './recently-earned';
import {RvrKillsComponent} from './rvr-kills';
import {RaceClassKillsComponent} from './race-class-kills';
import {RpRankingsComponent} from './rp-rankings';
import {ProgressComponent} from './progress';
import {PveKillsComponent} from './pve-kills';
import {TradeskillsComponent} from './tradeskills';

@Component({
  moduleId: module.id,
  selector: 'character-profile',
  templateUrl: 'character-profile.component.html',
  styleUrls: ['character-profile.component.css'],
  providers: [CharacterProfileService],
  directives: [SiegeStatsComponent,
    RecentlyEarnedComponent,
    RvrKillsComponent,
    RaceClassKillsComponent,
    RpRankingsComponent,
    ProgressComponent,
    PveKillsComponent,
    TradeskillsComponent]
})
export class CharacterProfileComponent implements OnInit, OnDestroy {
  character: CharacterProfile;
  sub: ISubscription;
  error: string;

  constructor(private playerProfileService: CharacterProfileService,
              private route: ActivatedRoute) {
  }

  ngOnInit() {
    this.sub = this.route.params.subscribe(params => {
      let name = params['name'];
      this.playerProfileService.getPlayer(name)
        .then(p => this.character = p)
        .catch(e => this.error = e);
    });
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

}
