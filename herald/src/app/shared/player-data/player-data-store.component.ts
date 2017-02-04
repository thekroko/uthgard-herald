import {SmallPlayerData} from './small-player-data';
import {Http} from '@angular/http';
import {Observable} from 'rxjs/Observable';

export class PlayerDataStore{
         
    public players: {
        name: string,
        index: number,
    }[] = [];

    public playerData: SmallPlayerData[] = [];

    constructor(private http:Http){}
    
    addPlayerName(playerName: string){
        this.players[playerName] = {name: playerName, index: -1}; 
    }

    addPlayers(playerNames: string[]){
        for (let i = 0; i < playerNames.length; i++){
            this.addPlayerName(playerNames[i]);
        } 
    }

    /**
    * sets the values on the players property, matching names and indices
    */
    setPlayerNameIndices(){
        for (let i = 0; i < this.playerData.length; i++){
            let currPlayerData = this.playerData[i];
            let currPlayerName = currPlayerData.fullName;
            this.players[currPlayerName].index = i;
        } 
    }
    
    /**
    * gets the player with the name specified
    */
    getPlayer(playerName: string){
        return new Promise(resolve => { 
            this.getPlayerData(playerName)
                .subscribe((data) => {
                    let indexToStore = this.playerData.length;
                    this.players[playerName] = {name: playerName, index: indexToStore};
                    this.playerData.push(data);
                    resolve(data);
                });
        }); 
    }

    getPlayerRange(startIndex: number, endIndex: number){
        //TODO: implement this properly, doesn't currently require players to be loaded
        return this.playerData.slice(startIndex, endIndex); 
    }

    /**
    * returns an observable which outputs player data for the name given
    */
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
