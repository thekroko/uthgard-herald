import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {Subject} from 'rxjs/Rx';
import {ISubscription} from 'rxjs/Subscription';
import {GuildProfileService} from './shared/guild-profile.service';
import {GuildProfile} from './shared/guild.model';
import {PlayerDataStore} from '../shared/player-data/player-data-store.component';
import {SmallPlayerData} from '../shared/player-data/small-player-data';
import {SmallPlayerDataService} from '../shared/small-player-data.service';

@Component({
  selector: 'herald-guild-profile',
  templateUrl: './guild-profile.component.html',
  styleUrls: ['./guild-profile.component.css'],
})
export class GuildProfileComponent implements OnInit {
  sub: ISubscription;
  guild: GuildProfile; //the guild which should be displayed
  error: string; //whether there is an error

  tableDataSubject: Subject<any> = new Subject<any>(); //to provide data to the player table
  currentSortColumn: string = ''; //which column of the table is currently sorted
  currentIterator: number = 0; //the index at which player data starts
  pageSize: number = 5; //the amount of players to be displayed per page of hte guild profile

  //used to convert keys of player data to display names
  playerTableHeaders: {keyName: string, displayName: string}[] = [
    {keyName: 'fullName', displayName: 'Name'},
    {keyName: 'raceName', displayName: 'Race'},
    {keyName: 'className', displayName: 'Class'},
    {keyName: 'level', displayName: 'Level'},
    {keyName: 'realmRank', displayName: 'Realm Rank'},
  ];

  //which columns of the player data are hidden
  playerTableHiddenColumns: string[] = [
    'realm',
    'rpPercent',
    'xpPercent',
  ];

  //used to store, sort, and retrieve player data
  playerDataStore: PlayerDataStore = new PlayerDataStore(this.smallPlayerDataService);

  constructor(private route: ActivatedRoute,
              private guildProfileService: GuildProfileService,
              private smallPlayerDataService: SmallPlayerDataService) {
  }


  ngOnInit() {
    this.sub = this.route.params.subscribe(params => {
    this.guildProfileService.getGuildProfile(params['name'])
        .subscribe((guildProfile: GuildProfile) => {
                this.guild = guildProfile;

                this.playerDataStore.addPlayers(this.guild.players);
                this.playerDataStore.getPlayerRange(this.currentIterator, this.currentIterator + this.pageSize)
                    .then((data) => {
                            this.tableDataSubject.next(data);
                            console.dir(this.playerDataStore.playerData);
                    });

            }, (error) => {
                this.error = error;
            });
    });
  }

  /**
  * responds to a click on a player table header, in this case by sending
  * sorted data to the player table
  * @param headerText the header of the column clicked
  */
  handlePlayerTableHeaderClick(headerText: string) {
    this.playerDataStore.sortPlayersForValue(headerText)
        .then(() => {
            this.setSortColumn(headerText);

            let reversed = this.currentSortColumn[0] === '-';

            this.playerDataStore.getPlayerRange(this.currentIterator, this.currentIterator + this.pageSize, reversed).then(
                (returnedPlayerData: SmallPlayerData[]) => {
                    if (this.currentSortColumn[0] === '-') {
                        //TODO: reverse needs to be done at player data store level
                        returnedPlayerData.reverse();
                    };
                    this.tableDataSubject.next(returnedPlayerData);
                    console.dir(this.playerDataStore.playerData);
                }
            );
        });
  }

  /**
  * sets the sort column based on the data passed in and the current sort column
  * @param headerText the headerText which was clicked
  */
  setSortColumn(headerText: string) {
    //-before indicates descending sort
    //sets to reversed sort if the column sort is the same
    this.currentSortColumn = headerText === this.currentSortColumn ? `-${headerText}` : headerText;
  }
}
