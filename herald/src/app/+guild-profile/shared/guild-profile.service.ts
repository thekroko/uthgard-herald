import {Injectable} from '@angular/core';
import {Http} from '@angular/http';
import {GuildProfile} from './guild.model';
import {ApiUrlConstants} from './../../shared/api-url-constants';
//import {mockGuildProfiles} from './mock-guild-profiles';

import 'rxjs/add/operator/map';
import {Observable} from 'rxjs/Rx';

@Injectable()
export class GuildProfileService {

  constructor(private http: Http) {}

  /**
   * Gets the GuildProfile of a character
   * @param name The guild's name to look up
   * @returns {Promise<GuildProfile>}
   */
  getGuildProfile(name: string): Observable<GuildProfile> {
    //todo hook into real API once it exists
    return this.getGuildProfileFromFile(name);
  }

  private getGuildProfileFromFile(name: string) {
    console.log('making call from guild profile service for ' + name);
    let fileName = name.replace(/ /g, '-');
    return this.http.get(`${ApiUrlConstants.Guild}/${fileName}`)
                    .map((res) => {

                      if (res.status !== 200) {
                        throw new Error('Guild not found');
                      }

                      let data = JSON.parse(res.text());
                      let foundGuild = data;

                      console.log(data);

                      return new GuildProfile(
                        foundGuild.name,
                        foundGuild.guildContact,
                        foundGuild.guildWebsite,
                        foundGuild.guildHouse,
                        foundGuild.guildRealmPoints,
                        foundGuild.players,
                        foundGuild.guildRealm,
                      );
                    });
  }
}
