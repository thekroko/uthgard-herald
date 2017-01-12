import {Injectable} from '@angular/core';
import {Http} from '@angular/http';
import {GuildProfile} from './guild.model';
//import {mockGuildProfiles} from './mock-guild-profiles';

import 'rxjs/add/operator/map';
import {Observable} from 'rxjs/Rx';

@Injectable()
export class GuildProfileService {

  constructor(private http: Http){}



  /**
   * Gets the GuildProfile of a character
   * @param name The guild's name to look up
   * @returns {Promise<GuildProfile>}
   */
  getGuildProfile(name: string): Observable<GuildProfile>{
    //todo hook into real API once it exists
    return this.getGuildProfileFromFile(name);
  }

  private getGuildProfileFromFile(name: string){
    return this.http.get('/data/guild-data.json')
                    .map((res) => {
                      let data = JSON.parse(res.text());
                      let foundGuild = data.find((guild => {
                        return name === guild.name;
                      }));
                      //TODO: implement error handling
                      return new GuildProfile(
                        foundGuild.name,
                        foundGuild.contact,
                        foundGuild.website, 
                        foundGuild.guildHouse,
                        foundGuild.guildRealmPoints,
                        foundGuild.players,
                        foundGuild.realm,
                      );
                    });
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
/*
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
*/

  /**
   * A test function which looks up guild from mock-guild-profiles.ts
   * @param name The guild's name to look up
   * @param delayMS The delay in milliseconds to be artificially applied
   * @returns {Promise<GuildProfile>}
   */
/*
  private getGuildFromMockDataWithDelay(name: string, delayMS: number): Promise<GuildProfile> {
    return new Promise<GuildProfile>(resolve => setTimeout(() =>
      resolve(this.getGuildFromMockData(name)), delayMS));
  }
*/

}
