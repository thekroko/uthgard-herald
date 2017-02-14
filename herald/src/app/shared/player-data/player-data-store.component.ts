import {SmallPlayerData} from './small-player-data';
import {Http} from '@angular/http';
import {Observable} from 'rxjs/Observable';

export class PlayerDataStore{
         
    public playerData: SmallPlayerData[] = [];
    public playerNames: string[] = []; //as column_name: [list of player names sorted by that] (including an unsorted)
    public currentColumnSort: string = 'alpha'; //alphabetical as default sort

    constructor(private http:Http){
        this.playerNames['unsorted'] = []; 
        this.playerNames['alpha'] = []; //to ensure we always have an alpha sorted list
    }

    //returns players from the current sort between the values specified
    getPlayerRange(startIndex: number, endIndex: number, reverse: boolean = false): Promise<SmallPlayerData[]>{
        
        let firstIndex = reverse ? this.playerNames[this.currentColumnSort].length - startIndex : startIndex;
        let secondIndex = reverse ? this.playerNames[this.currentColumnSort].length - endIndex : endIndex;

        let firstIndexTemp = firstIndex;
        firstIndex = Math.min(firstIndexTemp, secondIndex);
        secondIndex = Math.max(firstIndexTemp, secondIndex);    

        let selectedPlayers = this.playerNames[this.currentColumnSort].slice(firstIndex, secondIndex); 

        return new Promise((resolve) => {
            let playerPromises: Promise<SmallPlayerData>[] = []; 
            
            for (let i = 0; i < selectedPlayers.length; i++){
                 playerPromises.push(this.loadPlayer(selectedPlayers[i]));
            }

            Promise.all(playerPromises).then((loadedValues) => {
                resolve(loadedValues);//TODO: sort before resolve
            });
        })
    }
    
    //adds a player name
    addPlayerName(playerName: string){
        this.playerNames['unsorted'].push(playerName);
        this.addPlayerNameToAlpha(playerName);
    }

    //adds a player name to the list of alpha sorted player names
    addPlayerNameToAlpha(playerName: string){
        var i;
        for (i=0; i<this.playerNames['alpha'].length && playerName > this.playerNames['alpha'][i]; i++){
        }
        this.playerNames['alpha'].splice(Math.max(i, 0), 0, playerName);
    }

    //adds a list of player names to the list of player names
    addPlayers(playerNames: string[]){
        for (let i = 0; i < playerNames.length; i++){
            this.addPlayerName(playerNames[i]);
        } 
    }
    
    //sets a sorted list of player names according the the value key provided
    sortPlayersForValue(valueKey: string){
        return new Promise(resolve => {
            let sortedPlayers = [];
            let loadedCount = 0;

            for (let i = 0; i < this.playerNames['unsorted'].length; i++){
                let currPlayer = this.playerNames['unsorted'][i];
                this.getPlayerData(currPlayer)
                    .subscribe(data => {

                        if(data[valueKey]) {
                            this.currentColumnSort = valueKey;
                            var i;
                            for (i=0; i<sortedPlayers.length && data[valueKey] > sortedPlayers[i][valueKey]; i++){}

                            sortedPlayers.splice(Math.max(i, 0), 0, data);
                            this.playerNames[valueKey] = sortedPlayers.map(p => p.fullName);

                            loadedCount++;

                            if (loadedCount >= this.playerNames['unsorted'].length){
                                resolve(this.namesToData(this.playerNames[valueKey]));
                            }
                        } else {
                            throw new Error(`Player cannot be sorted on ${valueKey}`);
                        }

                    }); 
            }    
        });
    }
    
    /**
    * converts a list of player names to the data held on them
    * if no data is held, none will not be added
    */
    namesToData(names: string[]){
        let playerData = [];
        for (let i = 0; i < names.length; i++){
            let playerCheckingData = this.playerData[names[i]];
            if (playerCheckingData){
                playerData.push(playerCheckingData);
            }
        }
        return playerData;
    }

    //loads a player and adds it to the list of playerData
    loadPlayer(playerName: string){
        return new Promise(resolve => {
            if (this.playerData[playerName]){
                resolve(this.playerData[playerName]); 
            } else {
                this.getPlayerData(playerName)
                    .subscribe(data => {
                        this.playerData[playerName] = data;
                        resolve(data); 
                    })         
            }
        }); 
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

            let newPlayer = new SmallPlayerData(
                      foundPlayer.fullName,
                      foundPlayer.raceName,
                      foundPlayer.className,
                      foundPlayer.level,
                      foundPlayer.xpPercent,
                      foundPlayer.rpPercent,
                      foundPlayer.realmRank,
                      foundPlayer.realm,
                   );


            this.playerData[playerName] = newPlayer;
            
            return newPlayer;
        });
     }

    testLogPlayerNamesAlpha(){
        for (let i = 0; i < this.playerNames['alpha'].length; i++){
            console.log(`player at: ${i}: ${this.playerNames['alpha'][i]}`);
        }
        console.log("============================");
    }
    
    testLogPlayerNamesKey(valueKey: string){
        for (let i = 0; i < this.playerNames[valueKey].length; i++){
            console.log(`player at ${i}: ${this.playerNames[valueKey][i]}`);
            console.dir(this.playerNames[valueKey][i]);
        }
    }
}
