export class GuildProfile{

/**
* 
* TODO: are strings of names the best way of identifying players? 
* TODO: add in a way to represent emblems
*/
constructor(public name: string,
            public contact: string,
            public website: string,
            public guildHouse: string,
            public guildRealmPoints: number,
            public players: string[],
            public realm: string){
            }
}
