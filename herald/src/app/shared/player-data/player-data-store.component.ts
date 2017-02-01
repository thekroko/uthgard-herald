import {SmallPlayerData} from './small-player-data';
import {PlayerDataService} from './player-data.service';


export class PlayerDataStore{
    playerNames: string[]; // a list of player names
    playerData: SmallPlayerData[]; // the data for the players, stored with player name as key

    constructor(private playerDataService: PlayerDataService){}
    
    addPlayer(playerName: string){
        this.playerNames.push(playerName);
    } 

    addPlayers(players: string[]){
       this.playerNames = [...this.playerNames || [], ...players]; 
    }

    loadPlayer(playerName: string){
        if (!this.playerData[playerName]){
            this.playerDataService.getPlayerData(playerName)
                .subscribe((playerData) => {
                    playerData[playerName] = playerData;
                });
        }
    }
}
