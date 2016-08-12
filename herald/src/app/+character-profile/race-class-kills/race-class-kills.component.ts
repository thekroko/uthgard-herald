import {Component, Input, OnInit} from '@angular/core';
import {CharacterProfile} from '../shared/character-profile.model';

import 'chartjs';
import {Realm} from '../../shared/realm.enum';
declare let Chart;

@Component({
  moduleId: module.id,
  selector: 'race-class-kills',
  templateUrl: 'race-class-kills.component.html',
  styleUrls: ['../character-profile.component.css',
    'race-class-kills.component.css']
})
export class RaceClassKillsComponent implements OnInit {
  @Input()
  character: CharacterProfile;
  realm1: string;
  realm2: string;
  activeBtn: number = 1;

  constructor() {
  }

  ngOnInit() {
    const raceLabels = {
      'albion': ['Briton', 'Saracen', 'Highlander', 'Avalonian', 'Inconnu'],
      'hibernia': ['Celt', 'Lurikeen', 'Firbolg', 'Elf', 'Sylvan'],
      'midgard': ['Norse', 'Kobold', 'Troll', 'Dwarf', 'Valkyn']
    };
    const titles = {
      'albion': 'Members of Albion Killed',
      'hibernia': 'Members of Hibernia Killed',
      'midgard': 'Members of Midgard Killed'
    };
    const colors = {
      'albion': ['rgba(255, 20, 0, 1)', 'rgba(255, 20, 0, 0.2)'],
      'hibernia': ['rgba(0, 206, 86, 1)', 'rgba(0, 206, 86, 0.2)'],
      'midgard': ['rgba(0, 100, 250, 1)', 'rgba(0, 100, 250, 0.2)']
    };
    const classLabels = {
      'albion': ['Armsman', 'Cabalist', 'Cleric', 'Friar', 'Infiltrator', 'Mercenary',
        'Minstrel', 'Necromancer', 'Paladin', 'Reaver', 'Scout', 'Sorcerer',
        'Theurgist', 'Wizard'],
      'hibernia': ['Berserker', 'Bonedancer', 'Healer', 'Hunter', 'Runemaster', 'Savage',
        'Shadowblade', 'Shaman', 'Skald', 'Spiritmaster', 'Thane', 'Warrior'],
      'midgard': ['Animist', 'Bard', 'Blademaster', 'Champion', 'Druid', 'Eldritch',
        'Enchanter', 'Hero', 'Mentalist', 'Nightshade', 'Ranger',
        'Valewalker', 'Warden']
    };

    let racesData: number[][] = [];
    let classesData: number[][] = [];

    switch (this.character.realm) {
      case Realm.Albion:
        this.realm1 = 'hibernia';
        this.realm2 = 'midgard';
        racesData[0] = this.character.hibRaceKills;
        racesData[1] = this.character.midRaceKills;
        classesData[0] = this.character.hibClassKills;
        classesData[1] = this.character.midClassKills;
        break;
      case Realm.Hibernia:
        this.realm1 = 'albion';
        this.realm2 = 'midgard';
        racesData[0] = this.character.albRaceKills;
        racesData[1] = this.character.midRaceKills;
        classesData[0] = this.character.albClassKills;
        classesData[1] = this.character.midClassKills;
        break;
      case Realm.Midgard:
        this.realm1 = 'albion';
        this.realm2 = 'hibernia';
        racesData[0] = this.character.albRaceKills;
        racesData[1] = this.character.hibRaceKills;
        classesData[0] = this.character.albClassKills;
        classesData[1] = this.character.hibClassKills;
        break;
      default:
        this.realm1 = 'hibernia';
        this.realm2 = 'midgard';
        racesData[0] = this.character.hibRaceKills;
        racesData[1] = this.character.midRaceKills;
        classesData[0] = this.character.hibClassKills;
        classesData[1] = this.character.midClassKills;
    }

    new Chart(document.getElementById('races-killed1'), {
      type: 'bar',
      data: {
        labels: raceLabels[this.realm1],
        datasets: [{
          label: titles[this.realm1],
          borderColor: colors[this.realm1][0],
          backgroundColor: colors[this.realm1][1],
          borderWidth: 1,
          data: racesData[0]
        }]
      }
    });

    new Chart(document.getElementById('races-killed2'), {
      type: 'bar',
      data: {
        labels: raceLabels[this.realm2],
        datasets: [{
          label: titles[this.realm2],
          borderColor: colors[this.realm2][0],
          backgroundColor: colors[this.realm2][1],
          borderWidth: 1,
          data: racesData[1]
        }]
      }
    });

    new Chart(document.getElementById('classes-killed1'), {
      type: 'bar',
      data: {
        labels: classLabels[this.realm1],
        datasets: [{
          label: titles[this.realm1],
          borderColor: colors[this.realm1][0],
          backgroundColor: colors[this.realm1][1],
          borderWidth: 1,
          data: classesData[0]
        }]
      }
    });

    new Chart(document.getElementById('classes-killed2'), {
      type: 'bar',
      data: {
        labels: classLabels[this.realm2],
        datasets: [{
          label: titles[this.realm2],
          borderColor: colors[this.realm2][0],
          backgroundColor: colors[this.realm2][1],
          borderWidth: 1,
          data: classesData[1]
        }]
      }
    });
  }


  selectTab(event: Event, tabNum: number) {
    event.preventDefault();
    this.activeBtn = tabNum;
  }
}
