import {Component, OnInit} from '@angular/core';
import {Subject} from 'rxjs/Rx';
import {PlayerDataStore} from '../shared/player-data/player-data-store.component';
import {SmallPlayerDataService} from '../shared/small-player-data.service';
import {PlayerSearchService} from '../shared/player-search.service';

@Component({
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  playerSearchResults: PlayerDataStore;
  maxSearchResults: number = 50;
  searchDataSubject: Subject<any> = new Subject<any>(); //to provide data to the player search table

  constructor(private playerSearchService: PlayerSearchService,
              private smallPlayerDataService: SmallPlayerDataService) {
  }

  ngOnInit() {
    this.playerSearchResults = new PlayerDataStore(this.smallPlayerDataService);
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
                  this.searchDataSubject.next(fullPlayerData);
              });
      });
  }

}
