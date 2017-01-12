"use strict"

const fs = require('fs');

const GUILD_COUNT= process.argv[2] || 1;

let names = [
    'MYTH',
    'Dragon dragons',
    'Kings of danger',
    '%20maniacs',
    '2aq123',
    '123123',
    'fluff fluff fluff fluff fluff fluff fluff fluff fluff fluff fluff fluff fluff fluff fluff fluff fluff fluff fluff fluff fluff fluff fluff fluff fluff fluff fluff fluff fluff fluff fluff fluff fluff fluff fluff fluff fluff fluff fluff fluff fluff',
    'undefined',
    'false',
]

let guilds = [];

for (let i=0; i<GUILD_COUNT; i++){
    
    let guildName = names[Math.floor(Math.random()*names.length)];
    let guildHouse = Math.random() > 0.4 ? "None" : `Lot ${Math.floor(Math.random() * 150)+1}`
    let guildRealmPoints = Math.floor(Math.random() * 100000000000); //TODO: is this right?
    let guildRealm = ['Albion', 'Hibernia', 'Midgard'][Math.floor(Math.random()*3)]
    let guildWebsite = '';
    let guildContact = '';

    let guildPlayers = [];//TODO: add this

    guilds.push({
        name: guildName,
        guildHouse: guildHouse,
        guildRealmPoints: guildRealmPoints,
        guildRealm: guildRealm,
        guildWebsite: guildWebsite,
        guildContact: guildContact,
    });
}

console.dir(guilds);

fs.writeFile('./guild-data.json', JSON.stringify(guilds));


//constructor(public name: string,
            //public contact: string,
            //public website: string,
            //public guildHouse: string,
            //public guildRealmPoints: number,
            //public players: string[],
            //public realm: string){
    //}
//}
