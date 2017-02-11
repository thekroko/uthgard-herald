import {Component,OnInit} from '@angular/core';

import {ActivatedRoute} from '@angular/router';
import {Subject} from 'rxjs/Rx';
import {ISubscription} from 'rxjs/Subscription';

import {Http} from '@angular/http';

import {GuildProfileService} from './shared/guild-profile.service';
import {GuildProfile} from './shared/guild.model';

import {PlayerDataStore} from '../shared/player-data/player-data-store.component';

@Component({
  selector: 'herald-guild-profile',
  templateUrl: './guild-profile.component.html',
  styleUrls: ['./guild-profile.component.css'],
})
export class GuildProfileComponent implements OnInit{
  sub: ISubscription;
  guild: GuildProfile;
  error: string;

  tableDataSubject: Subject<any> = new Subject<any>();

  playerDataStore: PlayerDataStore = new PlayerDataStore(this.http);  

  constructor(private route: ActivatedRoute,
              private guildProfileService: GuildProfileService,
              private http: Http) {
  }

  ngOnInit(){
    this.sub = this.route.params.subscribe(params => {
    this.guildProfileService.getGuildProfile(params['name'])
        .subscribe((guildProfile: GuildProfile) => {
                this.guild = guildProfile;

                this.playerDataStore.addPlayers(this.guild.players);

                this.playerDataStore.sortPlayersForValue('raceName')
                    .then((data) => {
                        this.tableDataSubject.next(data);
                    },
                    (err) => {
                        console.dir(err);
                    })
            },(error) => {
                this.error = error;
            });
    });
    
    //this is just to test data listening
    this.tableDataSubject.subscribe(data => {
        console.log("noticed tableDataSubject on parent");
        console.log(data);
    });
  }
}
