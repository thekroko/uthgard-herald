import {Component, Input, AfterContentInit, ViewChild} from '@angular/core';
import {CharacterProfile} from '../shared/character-profile.model';
import {Realm} from '../../shared/realm.enum';
import {RvrKillStats} from '../shared/rvr-kill-stats.model';

const Chart = require('chart.js');

@Component({
  selector: 'herald-rvr-kills',
  templateUrl: './rvr-kills.component.html',
  styleUrls: ['../character-profile.component.css',
    './rvr-kills.component.css']
})
export class RvrKillsComponent implements AfterContentInit {
  @Input()
  character: CharacterProfile;
  @ViewChild('killStats') killStats;

  constructor() {
  }

  ngAfterContentInit() {
    let labels: string[];
    let data: number[];
    const stats: RvrKillStats = this.character.rvrStats;

    switch (this.character.realm) {
      case Realm.Albion:
        labels = ['Total Kills', 'Hibernia Kills', 'Midgard Kills', 'Deathblows', 'Solo Kills'];
        data = [stats.totalKills(), stats.hibKills, stats.midKills, stats.deathblows, stats.soloKills];
        break;
      case Realm.Hibernia:
        labels = ['Total Kills', 'Albion Kills', 'Midgard Kills', 'Deathblows', 'Solo Kills'];
        data = [stats.totalKills(), stats.albKills, stats.midKills, stats.deathblows, stats.soloKills];
        break;
      case Realm.Midgard:
        labels = ['Total Kills', 'Albion Kills', 'Hibernia Kills', 'Deathblows', 'Solo Kills'];
        data = [stats.totalKills(), stats.albKills, stats.hibKills, stats.deathblows, stats.soloKills];
        break;
    }


    let killStatsCanvas = this.killStats.nativeElement; 
    new Chart(killStatsCanvas, {
      type: 'bar',
      data: {
        labels: labels,
        datasets: [{
          label: 'RvR Kills',
          data: data,
          backgroundColor: 'rgba(255, 206, 86, 0.2)',
          borderColor: 'rgba(255, 206, 86, 1)',
          borderWidth: 1
        }]
      },
      options: {
        title: {
          display: true
        },
        scales: {
          yAxes: [{
            ticks: {
              beginAtZero: true
            }
          }]
        }
      }
    });
  }

}
