import {Component, Input, AfterContentInit, ViewChild} from '@angular/core';
import {CharacterProfile} from '../shared/character-profile.model';

import * as moment from 'moment';
const Chart = require('chart.js');

@Component({
  selector: 'herald-rp-rankings',
  templateUrl: './rp-rankings.component.html',
  styleUrls: ['../character-profile.component.css',
    './rp-rankings.component.css']
})
export class RpRankingsComponent implements AfterContentInit {
  @Input()
  character: CharacterProfile;
  activeBtn: number = 1;

  @ViewChild('weeklyRPCanvas') weeklyRPCanvas;
  @ViewChild('yearlyRPCanvas') yearlyRPCanvas;
  @ViewChild('weeklyRankCanvas') weeklyRankCanvas;
  @ViewChild('overallRankCanvas') overallRankCanvas;

  constructor() {
  }

  ngAfterContentInit() {
    //weekly RP graph
    let weeklyRpDate = moment().subtract(6, 'days');
    new Chart(this.weeklyRPCanvas.nativeElement, {
      type: 'line',
      data: {
        labels: [
          weeklyRpDate.format('dddd'),
          weeklyRpDate.add(1, 'days').format('dddd'),
          weeklyRpDate.add(1, 'days').format('dddd'),
          weeklyRpDate.add(1, 'days').format('dddd'),
          weeklyRpDate.add(1, 'days').format('dddd'),
          weeklyRpDate.add(1, 'days').format('dddd'),
          weeklyRpDate.add(1, 'days').format('dddd')
        ],
        datasets: [{
          label: 'Weekly RPs',
          data: [500, 300, 400, 600, 200, 250, 300], /* todo this is test data */
          backgroundColor: 'rgba(255, 206, 86, 0.2)',
          borderColor: 'rgba(255, 206, 86, 1)',
          borderWidth: 1
        }]
      },
      options: {
        scales: {
          yAxes: [{
            ticks: {
              beginAtZero: true
            }
          }]
        }
      }
    });

    //monthly RP graph
    let monthlyRpDate = moment().subtract(11, 'months');
    new Chart(this.yearlyRPCanvas.nativeElement, {
      type: 'line',
      data: {
        labels: [
          monthlyRpDate.format('MMMM'),
          monthlyRpDate.add(1, 'months').format('MMMM'),
          monthlyRpDate.add(1, 'months').format('MMMM'),
          monthlyRpDate.add(1, 'months').format('MMMM'),
          monthlyRpDate.add(1, 'months').format('MMMM'),
          monthlyRpDate.add(1, 'months').format('MMMM'),
          monthlyRpDate.add(1, 'months').format('MMMM'),
          monthlyRpDate.add(1, 'months').format('MMMM'),
          monthlyRpDate.add(1, 'months').format('MMMM'),
          monthlyRpDate.add(1, 'months').format('MMMM'),
          monthlyRpDate.add(1, 'months').format('MMMM'),
          monthlyRpDate.add(1, 'months').format('MMMM')
        ],
        datasets: [{
          label: 'Weekly RPs',
          data: [1200, 1100, 1000, 900, 800, 700, 600, 500, 400, 300, 200, 100], /* todo this is test data */
          backgroundColor: 'rgba(255, 206, 86, 0.2)',
          borderColor: 'rgba(255, 206, 86, 1)',
          borderWidth: 1
        }]
      },
      options: {
        scales: {
          yAxes: [{
            ticks: {
              beginAtZero: true
            }
          }]
        }
      }
    });

    //weekly rank graph
    new Chart(this.weeklyRankCanvas.nativeElement, {
      type: 'bar',
      data: {
        labels: ['Top All Classes', 'Top Armsman', '#25 All Classes', '#25 Armsman', 'Desperados'],
        datasets: [{
          label: 'RP Rankings this week',
          data: [421444, 211321, 143222, 58654, 123456], /* todo this is test data */
          backgroundColor: 'rgba(255, 206, 86, 0.2)',
          borderColor: 'rgba(255, 206, 86, 1)',
          borderWidth: 1
        }]
      },
      options: {
        title: {
          display: true,
          text: 'RvR Kills Overview (click for realm breakdown)'
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

    //overall rank graph
    new Chart(this.overallRankCanvas.nativeElement, {
      type: 'bar',
      data: {
        labels: ['Top All Classes', 'Top Armsman', '#25 All Classes', '#25 Armsman', 'Desperados'],
        datasets: [{
          label: 'RP Rankings this week',
          data: [8421444, 5211321, 3143222, 4158654, 999999], /* todo this is test data */
          backgroundColor: 'rgba(255, 206, 86, 0.2)',
          borderColor: 'rgba(255, 206, 86, 1)',
          borderWidth: 1
        }]
      },
      options: {
        title: {
          display: true,
          text: 'RvR Kills Overview (click for realm breakdown)'
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

  selectTab(event: Event, tabNum: number) {
    event.preventDefault();
    this.activeBtn = tabNum;
  }
}
