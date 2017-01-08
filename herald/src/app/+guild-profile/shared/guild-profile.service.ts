import {Injectable} from '@angular/core';
import {GuildProfile} from './guild.model';
import {mockGuildProfiles} from './mock-guild-profiles';

@Injectable()
export class GuildProfileService {

  /**
   * Gets the GuildProfile of a character
   * @param name The guild's name to look up
   * @returns {Promise<GuildProfile>}
   */
  getGuildProfile(name: string): Promise<GuildProfile> {
    //todo hook into real API once it exists
    return this.getGuildFromMockDataWithDelay(name, 100);
  }

  /*
  private getGuildFromApi(name: string) : Promise<GuildProfile> {
    //todo once api is figured out
  }*/

  /**
   * A test function which looks up players from mock-character-profiles.ts
   * @param name The guild's name to look up
   * @returns {Promise<GuildProfile>}
   */
  private getGuildFromMockData(name: string): Promise<GuildProfile> {
    return new Promise<GuildProfile>(function (fulfill, reject) {
      let guild = mockGuildProfiles.find(g => g.name === name);
      if (!guild) {
        reject(new Error('Guild not found'));
      } else {
        fulfill(guild);
      }
    });
  }

  /**
   * A test function which looks up guild from mock-guild-profiles.ts
   * @param name The guild's name to look up
   * @param delayMS The delay in milliseconds to be artificially applied
   * @returns {Promise<GuildProfile>}
   */
  private getGuildFromMockDataWithDelay(name: string, delayMS: number): Promise<GuildProfile> {
    return new Promise<GuildProfile>(resolve => setTimeout(() =>
      resolve(this.getGuildFromMockData(name)), delayMS));
  }

}
