"use strict"

const fs = require('fs');
const path = require('path');
const PLAYER_COUNT = process.argv[2] || 1;
const BASE_DIR = path.resolve(__dirname, './src/assets/data/');

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

function getPlayerName(){
    let l1 = ['f', 'p', 'm', 'n', 't'];
    let v = ['a', 'e', 'i', 'o', 'u'];
    let l2 = ['r', 'n', 'th', 'd'];

    //this is just to make things a bit easier to read
    let ri = getRandomArrayItem;

    let firstPart = `${ri(l1)}${ri(v)}${ri(l2)}`
    let secondPart = `${ri(l1)}${ri(v)}${ri(l2)}`

    return `${firstPart}${ri(v)}${secondPart}`;
}

let albion =
{
    races: [
        'Briton',
        'Avalonian',
        'Highlander',
        'Saracen',
    ],
    classes: [
        'Paladin',
        'Armsman',
        'Scout',
        'Minstrel',
        'Theurgist',
        'Cleric',
        'Wizard',
        'Sorcerer',
        'Infiltrator',
        'Friar',
        'Mercenary',
        'Necromancer',
        'Cabalist',
        'Fighter',
        'Elementalist',
        'Acolyte',
        'Mage',
        'Reaver',
    ],
}

let midgard = 
{
    races: [
        'Norseman',
        'Troll',
        'Dwarf',
        'Kobold',
    ],
    classes:[
        'Thane',
        'Warrior',
        'Shadowblade',
        'Skald',
        'Hunter',
        'Healer',
        'Spiritmaster',
        'Shaman',
        'Runemaster',
        'Bonedancer',
        'Berserker',
        'Savage',
        'Heretic',
        'Valkyrie',
        'Viking',
        'Mystic',
        'Seer',
    ],
}

let hibernia = 
{
    races:[
        'Celt',
        'Firbolg',
        'Elf',
        'Lurikeen',
        'Inconnu',
        'Valkyn',
        'Sylvan',
    ],
    classes:[
        'Bainshee',
        'Eldritch',
        'Enchanter',
        'Mentalist',
        'Blademaster',
        'Hero',
        'Champion',
        'Warden',
        'Druid',
        'Bard',
        'Nightshade',
        'Ranger',
        'Magician',
        'Guardian',
        'Naturalist',
        'Stalker',
        'Animist',
        'Valewalker',
        'Forester',
        'Vampiir',
        'Warlock',
    ],
}

let realms = [albion, midgard, hibernia];

let players = [];
let playerNames = [];

for (let i = 0; i < PLAYER_COUNT; i++){

    let currRealm = getRandomArrayItem(realms);
    
    let playerName = getPlayerName();
    let playerLevel = Math.ceil(Math.random() * 50);
    let playerRealmRank = Math.floor(Math.random() * 999999); //TODO: what is the actual max rr?

    let playerRace = getRandomArrayItem(currRealm.races);
    let playerClass = getRandomArrayItem(currRealm.classes);

    let xpPercent = Math.round(Math.random()*100, 2)
    let rpPercent = Math.round(Math.random()*100, 2)

    let generatedPlayer = {
        fullName: playerName,
        raceName: playerRace,
        className: playerClass,
        level: playerLevel,
        xpPercent: xpPercent,
        rpPercent: rpPercent, 
        realmRank: Math.random() * 10 //TODO: what should this be
    };

    players.push(generatedPlayer);
    playerNames.push(playerName);
}

//ensure that the directories exist
fs.mkdirp(`${BASE_DIR}`);
fs.mkdirp(`${BASE_DIR}/players`);

for (let i = 0; i < players.length; i++){
    let currPlayer = players[i];


    fs.writeFile(`${BASE_DIR}/players/${currPlayer.fullName.replace(/ /g, '-')}.json`, JSON.stringify(currPlayer), function(err){
        if (err) console.log(err); 
    });
}

fs.writeFile(`${BASE_DIR}/players.json`, JSON.stringify(playerNames), function(err){
    if (err) console.log(err);
});

console.dir(players);



