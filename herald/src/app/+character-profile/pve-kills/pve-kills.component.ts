import {Component, Input, AfterContentInit, ViewChild} from '@angular/core';
import {CharacterProfile} from '../shared/character-profile.model';

const Chart = require('chart.js');

@Component({
  selector: 'herald-pve-kills',
  templateUrl: './pve-kills.component.html',
  styleUrls: ['../character-profile.component.css',
    './pve-kills.component.css']
})
export class PveKillsComponent implements AfterContentInit {
  @Input()
  character: CharacterProfile;
  hasData = false;

  @ViewChild('mobsKilled') mobsKilled;

  constructor() {
  }

  ngAfterContentInit() {
    let mobNames: string[] = [];
    let numKills: number[] = [];
    let qty = 0;

    for (let entry of this.character.pveKills) {
      mobNames[qty] = entry.mobName;
      numKills[qty] = entry.numKills;
      qty++;
      // max of 5 mobs shown here
      if (qty === 5) {
        break;
      }
    }

    if (qty === 0) {
      return;
    }
    this.hasData = true;

    new Chart(this.mobsKilled.nativeElement, {
      type: 'pie',
      data: {
        labels: mobNames,
        datasets: [{
          label: 'PvE Kills',
          data: numKills,
          backgroundColor: [
            'rgba(255, 206, 86, 0.2)',
            'rgba(100, 26, 86, 0.2)',
            'rgba(255, 20, 0, 0.2)',
            'rgba(0, 106, 255, 0.2)',
            'rgba(255, 144, 144, 0.2)'
          ],
          borderColor: [
            'rgba(255, 206, 86, 1)',
            'rgba(100, 26, 86, 1)',
            'rgba(255, 20, 0, 1)',
            'rgba(0, 106, 255, 1)',
            'rgba(255, 144, 144, 1)'
          ],
          borderWidth: 1
        }]
      },
      options: {
        display: false
      }
    });

  }

}
