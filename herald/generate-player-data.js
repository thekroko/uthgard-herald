"use strict"

const fs = require('fs');

const PLAYER_COUNT = process.argv[2] || 1;

const BASE_DIR = './src/assets/data/';

function getRandomArrayItem(arrayIn){
    return arrayIn[Math.floor(Math.random() * arrayIn.length)];
}

function getPlayerName(){

}
