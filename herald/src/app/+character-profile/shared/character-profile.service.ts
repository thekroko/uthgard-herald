import {Injectable} from '@angular/core';
import {CharacterProfile} from './character-profile.model';
import {mockPlayerProfiles} from './mock-character-profiles';

@Injectable()
export class CharacterProfileService {

  /**
   * Gets the CharacterProfile of a character
   * @param name The character's name to look up
   * @returns {Promise<CharacterProfile>}
   */
  getPlayer(name: string): Promise<CharacterProfile> {
    //todo handle name case normalizing
    //todo hook into real API once it exists
    return this.getPlayerFromMockDataWithDelay(name, 100);
    //return this.getPlayerFromMockData(id);
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

}
