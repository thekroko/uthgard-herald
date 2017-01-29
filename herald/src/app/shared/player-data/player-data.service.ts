import {Injectable} from '@angular/core';
import {SmallPlayerData} from './small-player-data';
import {Observable} from 'rxjs/Observable';

@Injectable()
export class PlayerDataService{
  getPlayerData(playerName): Observable<SmallPlayerData>{
    let playerUrl = `/assets/data/players/${playerName}.json`;

    return this.http.get(playerUrl)
      .map((res) => {
          if (res.status !== 200){
              throw new Error('Player not found');
          }

          let data = JSON.parse(res.text());
          let foundPlayer = data;

          return new SmallPlayerData(
                    foundPlayer.fullName,
                    foundPlayer.raceName,
                    foundPlayer.className,
                    foundPlayer.level,
                    foundPlayer.xpPercent,
                    foundPlayer.rpPercent,
                    foundPlayer.realmRank,
                    foundPlayer.realm,
                 );
      });
   }
}

