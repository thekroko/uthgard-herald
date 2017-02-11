import {Injectable, isDevMode} from '@angular/core';
import {Http, Response} from '@angular/http';
import {CharacterProfile} from './character-profile.model';
import {Realm} from '../../shared/realm.enum';
import {mockPlayerProfiles} from './mock-character-profiles';
import {Observable} from 'rxjs/Rx';

@Injectable()
export class CharacterProfileService {
  
  private USE_MOCK_DATA = false;
  private API_URL = 'https://uthgard.org/herald/api/players';

  constructor(private http: Http){
    if (isDevMode()) {
      this.API_URL = '/herald/api/player/';
    }
  }

  /**
   * Gets the CharacterProfile of a character
   * @param name The character's name to look up
   * @returns {Promise<CharacterProfile>}
   */
  getPlayer(name: string): Promise<CharacterProfile> {
    //todo handle name case normalizing
    //todo hook into real API once it exists
    if (this.USE_MOCK_DATA) {
      return this.getPlayerFromMockDataWithDelay(name, 100);
    } else {
      var observable = this.getPlayerFromAPI(name);
      return new Promise<CharacterProfile>((resolve, reject) => {
        observable.subscribe(profile => resolve(profile),
                             error => reject(error));
      });
    }
  }

  /*
  private getPlayerFromApi(name: string) : Promise<CharacterProfile> {
    //todo once api is figured out
  }*/

  /**
   * A test function which looks up players from mock-character-profiles.ts
   * @param name The character's name to look up
   * @returns {Promise<CharacterProfile>}
   */
  private getPlayerFromMockData(name: string): Promise<CharacterProfile> {
    return new Promise<CharacterProfile>(function (fulfill, reject) {
      let player = mockPlayerProfiles.find(p => p.name === name);
      if (!player) {
        reject(new Error('Character not found'));
      } else {
        fulfill(player);
      }
    });
  }

  /**
   * A test function which looks up players from mock-character-profiles.ts
   * @param name The character's name to look up
   * @param delayMS The delay in milliseconds to be artificially applied
   * @returns {Promise<CharacterProfile>}
   */
  private getPlayerFromMockDataWithDelay(name: string, delayMS: number): Promise<CharacterProfile> {
    return new Promise<CharacterProfile>(resolve => setTimeout(() =>
      resolve(this.getPlayerFromMockData(name)), delayMS));
  }

  /**
   * Retrieves a player from the uthgard herald API
   * @param name The character's name to look up
   * @returns {Promise<CharacterProfile>}
   */
  private getPlayerFromAPI(name: string): Observable<CharacterProfile> {
    const request = this.http.get(this.API_URL + name);
    return request.map((response: Response) => this.getPlayerFromAPIResponse(response))
           .catch((error: any) => Observable.throw(error));
  }

  /**
   * Construct a CharacterProfile from the API response
   * @param response The {Response} object of the API call
   * @returns {CharacterProfile}
   */
  private getPlayerFromAPIResponse(response: Response): CharacterProfile {
    const json = response.json(), raw = json.Raw;
    const realm : Realm = {
      1: Realm.Albion,
      2: Realm.Midgard,
      3: Realm.Hibernia
    }[raw.Realm];
    const profile = new CharacterProfile(
      <string>json.FullName,
      <string>json.ClassName,
      <string>json.RaceName,
      realm,
      <string>raw.GuildName,
      <number>json.Level,
      <number>json.XP_Percent,
      <number>json.RealmRank,
      <number>json.RP_Percent,
    );
    return profile;
  }
}
