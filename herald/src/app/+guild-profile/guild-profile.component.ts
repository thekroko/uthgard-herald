import {Component,OnInit} from '@angular/core';

import {ActivatedRoute} from '@angular/router';
import {ISubscription} from 'rxjs/Subscription';

import {GuildProfileService} from './shared/guild-profile.service';
import {GuildProfile} from './shared/guild.model';

@Component({
  selector: 'herald-guild-profile',
  templateUrl: './guild-profile.component.html',
  styleUrls: ['./guild-profile.component.css'],
})
export class GuildProfileComponent implements OnInit{
  sub: ISubscription;
  guild: any;
  error: any;

  constructor(private route: ActivatedRoute, private guildProfileService: GuildProfileService) {
  }

  ngOnInit(){
    this.sub = this.route.params.subscribe(params => {
    this.guildProfileService.getGuildProfile(params['name'])
        .subscribe((guildProfile: GuildProfile) => {
                this.guild = guildProfile;
                console.log(this.guild);
            },(error) => {
                this.guild = false;
                this.error = error;
            });
    });
  }
}
