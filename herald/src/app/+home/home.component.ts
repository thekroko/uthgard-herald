import {Component, OnInit} from '@angular/core';
import {Subject} from 'rxjs/Rx';
import {PlayerDataStore} from '../shared/player-data/player-data-store.component';
import {SmallPlayerDataService} from '../shared/small-player-data.service';
import {PlayerSearchService} from '../shared/player-search.service';
import {GuildSearchService} from '../shared/guild-search.service';

declare var $: any;

@Component({
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {

  //player search
  playerSearchResults: PlayerDataStore;
  playerSearchDataSubject: Subject<any> = new Subject<any>(); //to provide data to the player search table

  //used to convert keys of player data to display names
  playerSearchTableHeaders: {keyName: string, displayName: string}[] = [
    {keyName: 'fullName', displayName: 'Name'},
    {keyName: 'raceName', displayName: 'Race'},
    {keyName: 'className', displayName: 'Class'},
    {keyName: 'level', displayName: 'Level'},
    {keyName: 'realmRank', displayName: 'Realm Rank'},
    {keyName: 'realm', displayName: 'Realm'},
  ];

  playerSearchLinkColumns: {keyName: string, urlPrefix: string}[] = [{keyName: 'fullName', urlPrefix: '/character/'}];

  //which columns of the player data are hidden
  playerSearchTableHiddenColumns: string[] = [
    'rpPercent',
    'xpPercent',
  ];

  //guild search
  guildSearchResults: any[];
  guildSearchDataSubject: Subject<any> = new Subject<any>(); //to provide data to the player search table

  //used to convert keys of player data to display names
  guildSearchTableHeaders: {keyName: string, displayName: string}[] = [
    {keyName: 'name', displayName: 'Name'},
  ];

  guildSearchLinkColumns: {keyName: string, urlPrefix: string}[] = [{keyName: 'name', urlPrefix: '/guild/'}];

  //which columns of the guild data are hidden
  guildSearchTableHiddenColumns: string[] = [
    'rpPercent',
    'xpPercent',
  ];

  maxSearchResults: number = 50;
  currentSearchType = 'player';

  constructor(private playerSearchService: PlayerSearchService,
              private guildSearchService: GuildSearchService,
              private smallPlayerDataService: SmallPlayerDataService) {
  }

  ngOnInit() {
    this.playerSearchResults = new PlayerDataStore(this.smallPlayerDataService);

    //jQuery stuff to handle animation
    $('.search-type-chevron').click(function(){
        $(this).toggleClass('rotated');
    });
    $('.search-type-label').click(function(){
        $(this).siblings('.search-type-chevron').toggleClass('rotated');
    });
  }

  /**
  * toggles the state of the current search type
  */
  toggleCurrentSearchType() {
    this.currentSearchType = this.currentSearchType === 'player' ? 'guild' : 'player';
  }

  /**
  * does the appropriate search for the current search state
  * @param value the value for which the search is to be conducted
  */
  doCurrentSearch(value: string) {
    if (this.currentSearchType === 'player') {
        this.doPlayerSearch(value);
    } else if (this.currentSearchType === 'guild') {
        this.doGuildSearch(value);
    }
  }

  /**
  * does a search for guilds and loads them into the search results table
  * @param value the guild which is being searched for
  */
  doGuildSearch(value: string) {
    console.log('doing a guild search for ' + value); //TODO: implement this properly
    this.guildSearchService.doGuildSearch(value)
        .subscribe((data) => {
            let guilds = [];
            //limit the number of results
            //get the guild data for each of these results
            //pass this data to guildSearchDataSubject
            for (let i = 0; i < data.length; i++) {
                let currGuildName = data[i];
                guilds.push({name: currGuildName}) ;
            }
            this.guildSearchDataSubject.next(guilds);
        });
  }

  /**
  * does a search for players with the value provided
  * @param value the player which is being searched for
  */
  doPlayerSearch(value: string) {
    this.playerSearchService.doPlayerSearch(value)
      .subscribe((data: string[]) => {
          this.playerSearchResults.clearAllData(); //we don't want old search results

          this.playerSearchResults.addPlayers(data);
          this.playerSearchResults.getPlayerRange(0, this.maxSearchResults)
              .then((fullPlayerData) => {
                  console.dir(fullPlayerData);
                  this.playerSearchDataSubject.next(fullPlayerData);
              });
      });
  }

}
