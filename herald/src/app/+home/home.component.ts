import {Component, OnInit} from '@angular/core';
import {Http} from '@angular/http';

import {Subject} from 'rxjs/Rx';
import {PlayerDataStore} from '../shared/player-data/player-data-store.component';

@Component({
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  playerSearchResults: PlayerDataStore;
  maxSearchResults: number = 50;
  searchDataSubject: Subject<any> = new Subject<any>(); //to provide data to the player search table

  constructor(private http: Http) {
  }

  ngOnInit() {
    this.playerSearchResults = new PlayerDataStore(this.http);
  }

  /**
  * does a search for players with the value provided
  * @param value the player which is being searched for
  */
  doPlayerSearch(value: string) {
    this.http.get(`https://uthgard.org/herald/api/search/player/${value}`)
        .map((res) => {
            if (res.status !== 200) {
                throw new Error('Player not found');
            }

            let data = JSON.parse(res.text());

            return data;
        })
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
