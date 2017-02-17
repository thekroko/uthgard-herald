#!/usr/bin/env node
"use strict"

const fs = require('fs');
const path = require('path');

const GUILD_COUNT= process.argv[2] || 1;
const BASE_DIR = path.resolve(__dirname, './src/assets/data/');

const albPlayers = require('./src/assets/data/alb_players.json');
const midPlayers = require('./src/assets/data/mid_players.json');
const hibPlayers = require('./src/assets/data/hib_players.json');

const realmPlayers = {
    albion: albPlayers,
    midgard: midPlayers,
    hibernia: hibPlayers,
};

fs.isDir = function(dpath) {
    try {
        return fs.lstatSync(dpath).isDirectory();
    } catch(e) {
        return false;
    }
};
fs.mkdirp = function(dirname) {
    dirname = path.normalize(dirname).split(path.sep);
    dirname.forEach((sdir,index)=>{
        var pathInQuestion = dirname.slice(0,index+1).join(path.sep);
        if((!fs.isDir(pathInQuestion)) && pathInQuestion) fs.mkdirSync(pathInQuestion);
    });
};

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

//we want one guild that will always be available
guilds.push({
    name: 'Test Guild',
    guildHouse: 'Lot 1',
    guildRealmPoints: '1000000',
    guildRealm: 'Albion',
    guildWebsite: 'www.google.co.uk',
    guildContact: 'test@test.com',
    players: []
});

guildNames.push('Test Guild');

for (let i=0; i<GUILD_COUNT; i++){
    
    let guildName = getGuildName();
    let guildHouse = Math.random() > 0.4 ? "None" : `Lot ${Math.floor(Math.random() * 150)+1}`;
    let guildRealmPoints = Math.floor(Math.random() * 100000000000); //TODO: is this right?
    let guildRealm = ['albion', 'hibernia', 'midgard'][Math.floor(Math.random()*3)];
    let guildWebsite = '';
    let guildContact = '';

    let currRealmPlayers = realmPlayers[guildRealm];
    let guildPlayers = [];

    let playerCount = Math.floor(Math.random() * currRealmPlayers.length);

    for (let j=0; j<playerCount; j++){
        let selectedPlayer = getRandomArrayItem(currRealmPlayers);
        guildPlayers.push(selectedPlayer);
    }

    guildNames.push(guildName);

    guilds.push({
        name: guildName,
        guildHouse: guildHouse,
        guildRealmPoints: guildRealmPoints,
        guildRealm: guildRealm,
        guildWebsite: guildWebsite,
        guildContact: guildContact,
        players: guildPlayers,
    });
}

//ensure we have the correct directories
fs.mkdirp(`${BASE_DIR}`);
fs.mkdirp(`${BASE_DIR}/guilds`);

//write each guild to a file
for (let i=0; i<guilds.length; i++){
    let currGuild = guilds[i];
    fs.writeFile(`${BASE_DIR}/guilds/${currGuild.name.replace(/ /g, '-')}.json`, JSON.stringify(currGuild), function(err){
        if (err) console.log(err); 
    });
}

//write the file for all guild names
fs.writeFile(`${BASE_DIR}/guilds.json`, JSON.stringify(guildNames), function(err){
    if (err) console.log(err);
});
