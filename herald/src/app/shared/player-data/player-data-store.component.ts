import {SmallPlayerData} from './small-player-data';
import {Http} from '@angular/http';
import {Observable} from 'rxjs/Observable';

export class PlayerDataStore {
         
    public playerData: SmallPlayerData[] = []; //the data for the players, indexed against their names 
    public playerNames: any  = {}; //as column_name: [list of player names sorted by that] (including an unsorted)
    public currentColumnSort: string; //alphabetical as default sort

    /**
    * @param http         the http service which will be used to fetch character data
    * @param presumedSort the column which will be the presumed sort by default
    */
    constructor(private http:Http, presumedSort: string = 'alpha') {
        //this.playerNames['unsorted'] = []; 
        //this.playerNames['alpha'] = []; //to ensure we always have an alpha sorted list
        this.initDefaultPlayerDataStoreValues();
        this.currentColumnSort = presumedSort;
    }

    /**
    * clears the player data currently being stored
    */
    clearAllData(){
        this.initDefaultPlayerDataStoreValues();
        this.currentColumnSort = 'unsorted';
    }

    /**
    * ensures the playerData and playerNames properties are initialised properly
    */
    initDefaultPlayerDataStoreValues(){
        this.playerData = [];
        this.playerNames = {unsorted: [], alpha: []};
    }

    /**
    * returns players data from the current sort between the values specified
    * @param startIndex the index from which to start
    * @param endIndex   the index at which to end
    * @param reversed   do we want to work from the end of the list?
    * @returns          a promise of an array of SmallPlayerData for the range specified
    */
    getPlayerRange(startIndex: number, endIndex: number, reverse: boolean = false): Promise<SmallPlayerData[]> {

        let firstIndex = reverse ? this.playerNames[this.currentColumnSort].length - startIndex : startIndex;
        let secondIndex = reverse ? this.playerNames[this.currentColumnSort].length - endIndex : endIndex;

        let firstIndexTemp = firstIndex;
        firstIndex = Math.min(firstIndexTemp, secondIndex);
        secondIndex = Math.max(firstIndexTemp, secondIndex);

        let selectedPlayers = this.playerNames[this.currentColumnSort].slice(firstIndex, secondIndex);

        return new Promise((resolve) => {
            let playerPromises: Promise<SmallPlayerData>[] = [];

            for (let i = 0; i < selectedPlayers.length; i++) {
                 playerPromises.push(this.loadPlayer(selectedPlayers[i]));
            }

            Promise.all(playerPromises).then((loadedValues) => {
                resolve(loadedValues); //TODO: sort before resolve
            });
        });
    }

    /**
    * adds a player name to the unsorted and alpha lists
    * @param playerName the name to be added
    */
    addPlayerName(playerName: string) {
        this.playerNames['unsorted'].push(playerName);
        this.addPlayerNameToAlpha(playerName);
    }

    /**
    * inserts the player name into the alpha list at the correct position
    * @param playername the name to be added
    */
    addPlayerNameToAlpha(playerName: string) {
        let i;
        for (i = 0; i < this.playerNames['alpha'].length && playerName > this.playerNames['alpha'][i]; i++) {}
        this.playerNames['alpha'].splice(Math.max(i, 0), 0, playerName);
    }

    /**
    * adds a list of player names to the list of player names
    * @param playerNames the list of names to be added
    */
    addPlayers(playerNames: string[]) {
        for (let i = 0; i < playerNames.length; i++) {
            this.addPlayerName(playerNames[i]);
        }
    }

    /**
    * sets a sorted list of player names according the the value key provided,
    * and returns a promise with the sorted data
    * @param valueKey the key of the property on which to sort
    * @returns        a promise with the player data sorted on the key provided
    */
    sortPlayersForValue(valueKey: string) {
        return new Promise(resolve => {
            let sortedPlayers = [];
            let loadedCount = 0;

            for (let n = 0; n < this.playerNames['unsorted'].length; n++) {
                let currPlayer = this.playerNames['unsorted'][n];
                this.getPlayerData(currPlayer)
                    .subscribe(data => {

                        if (data[valueKey]) {
                            this.currentColumnSort = valueKey;
                            let i;
                            for (i = 0; i < sortedPlayers.length && data[valueKey] > sortedPlayers[i][valueKey]; i++) {}

                            sortedPlayers.splice(Math.max(i, 0), 0, data);
                            this.playerNames[valueKey] = sortedPlayers.map(p => p.fullName);

                            loadedCount++;

                            if (loadedCount >= this.playerNames['unsorted'].length) {
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
    * @param names the list of player names for which data is needed
    * @returns     the data for the players, where it was available
    */
    namesToData(names: string[]) {
        let playerData = [];
        for (let i = 0; i < names.length; i++) {
            let playerCheckingData = this.playerData[names[i]];
            if (playerCheckingData) {
                playerData.push(playerCheckingData);
            }
        }
        return playerData;
    }

    /**
    * loads a player and adds it to the list of playerData
    * @param playerName the name of the player to be added
    * @returns          a promise with the data for the player
    */
    loadPlayer(playerName: string) {
        return new Promise(resolve => {
            if (this.playerData[playerName]) {
                resolve(this.playerData[playerName]);
            } else {
                this.getPlayerData(playerName)
                    .subscribe(data => {
                        this.playerData[playerName] = data;
                        resolve(data);
                    });
            }
        });
    }

    /**
    * returns an observable which outputs player data for the name given
    * @param playerName the name of the player for which data is being reuqested
    * @returns          an observable which will return the data for the player requested
    */
    getPlayerData(playerName): Observable<SmallPlayerData> {
      //let playerUrl = `/assets/data/players/${playerName}.json`;

      //return this.http.get(playerUrl)//temporary removed whilst testing against real data
      return this.http.get(`https://uthgard.org/herald/api/player/${playerName}`)
        .map((res) => {
            if (res.status !== 200) {
                throw new Error('Player not found');
            }

            let data = JSON.parse(res.text());
            let foundPlayer = data;

            /* removing temporarily for testing with live data
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
            */

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

            this.playerData[playerName] = newPlayer;

            return newPlayer;
        });
     }

    testLogPlayerNamesAlpha() {
        for (let i = 0; i < this.playerNames['alpha'].length; i++) {
            console.log(`player at: ${i}: ${this.playerNames['alpha'][i]}`);
        }
        console.log('============================');
    }

    testLogPlayerNamesKey(valueKey: string) {
        for (let i = 0; i < this.playerNames[valueKey].length; i++) {
            console.log(`player at ${i}: ${this.playerNames[valueKey][i]}`);
            console.dir(this.playerNames[valueKey][i]);
        }
    }
}
