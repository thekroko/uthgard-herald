"use strict"

const fs = require('fs');

const GUILD_COUNT= process.argv[2] || 1;

function getRandomArrayItem(arrayIn){
    return arrayIn[Math.floor(Math.random() * arrayIn.length)];
}

function getGuildName(){
    return getRandomArrayItem(namesFirsts) + ' ' + getRandomArrayItem(namesSeconds);
}

let namesFirsts = [
    'Mythical',
    'Iron',
    'Knights of',
    'Red',
    'Heroes of',
    'Kings of',
    'Doctors of',
    'Emerald',
];

let namesSeconds = [
    'Knights',
    'Dragons',
    'Sheep',
    'Funk',
    'Dogs',
    'Wolves',
];

let guilds = [];
let guildNames = [];

for (let i=0; i<GUILD_COUNT; i++){
    
    let guildName = getGuildName();
    let guildHouse = Math.random() > 0.4 ? "None" : `Lot ${Math.floor(Math.random() * 150)+1}`;
    let guildRealmPoints = Math.floor(Math.random() * 100000000000); //TODO: is this right?
    let guildRealm = ['Albion', 'Hibernia', 'Midgard'][Math.floor(Math.random()*3)];
    let guildWebsite = '';
    let guildContact = '';

    let guildPlayers = [];//TODO: add this

    guildNames.push(guildName);

    guilds.push({
        name: guildName,
        guildHouse: guildHouse,
        guildRealmPoints: guildRealmPoints,
        guildRealm: guildRealm,
        guildWebsite: guildWebsite,
        guildContact: guildContact,
    });
}

//write each guild to a file
for (let i=0; i<guilds.length; i++){
    let currGuild = guilds[i];
    fs.writeFile(`./guilds/${currGuild.name.replace(/ /g, '-')}.json`, JSON.stringify(currGuild), function(err){
        if (err) console.log(err); 
    });
}

//write the file for all guild names
fs.writeFile(`./guilds.json`, JSON.stringify(guildNames), function(err){
    if (err) console.log(err);
});
