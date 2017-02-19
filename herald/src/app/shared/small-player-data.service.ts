import {Injectable, isDevMode} from '@angular/core';
import {Http} from '@angular/http';
import {ApiUrlConstants} from './api-url-constants';
import {Observable} from 'rxjs/Rx';
import {SmallPlayerData} from './player-data/small-player-data';

@Injectable()
export class SmallPlayerDataService {

  private UseMockData = false;

  constructor(private http: Http) { }

  /**
   * Gets an observable which outputs player data for the name given
   * @param playerName the name of the player for which data is being requested
   * @returns {Observable<SmallPlayerData>}
   */
  getPlayerData(playerName: string): Observable<SmallPlayerData> {
    if (!isDevMode()) {
      this.getPlayerFromUthgardApi(playerName);
    }

    if (this.UseMockData) {
      return this.getPlayerFromMockData();
    }

    return this.getPlayerFromInternalApi(playerName);
  }

  /**
   * Gets an observable which outputs player data from the API for the name given
   * @param playerName the name of the player for which data is being requested
   * @returns {Observable<SmallPlayerData>}
   */
  private getPlayerFromUthgardApi(playerName: string): Observable<SmallPlayerData> {
    let url =  ApiUrlConstants.Player + playerName;
    return this.getPlayerFromUrl(url);

  }

  /**
   * Gets an observable which outputs a mock player data
   * @param playerName the name of the player for which data is being requested
   * @returns {Observable<SmallPlayerData>}
   */
  private getPlayerFromInternalApi(playerName: string): Observable<SmallPlayerData> {
    let url =  `/assets/data/players/${playerName}.json`;
    return this.getPlayerFromUrl(url);
  }

  /**
   * Gets SmallPlayerData from a URL endpoint
   * @param url The url to be read from
   * @returns {Observable<SmallPlayerData>}
   */
  private getPlayerFromUrl(url: string): Observable<SmallPlayerData> {
    return this.http.get(url)
      .map((res) => {
        if (res.status !== 200) {
          throw new Error('Player not found');
        }

        let data = JSON.parse(res.text());
        let foundPlayer = data;

        let newPlayer = new SmallPlayerData(
          foundPlayer.Name,
          foundPlayer.Race,
          foundPlayer.Class,
          foundPlayer.Level,
          foundPlayer.XpPercentOfLevel,
          foundPlayer.RpPercentOfLevel,
          foundPlayer.Rp,
          foundPlayer.Realm,
        );

        return newPlayer;
      });
  }


  /**
   * Gets a mocked up SmallPlayerDAta
   * @returns {Observable<SmallPlayerData>}
   */
  private getPlayerFromMockData(): Observable<SmallPlayerData> {
    return Observable.of(new SmallPlayerData('Testguy', 'Norseman', 'Shaman', 11, 10, 5, 3.1, 'midgard'));
  }

}
