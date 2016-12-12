import {Component, OnInit, OnDestroy} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {CharacterProfileService} from './shared/character-profile.service';
import {CharacterProfile} from './shared';
import {ISubscription} from 'rxjs/Subscription';

@Component({
  selector: 'herald-character-profile',
  templateUrl: './character-profile.component.html',
  styleUrls: ['./character-profile.component.css']
})
export class CharacterProfileComponent implements OnInit, OnDestroy {
  character: CharacterProfile;
  sub: ISubscription;
  error: string;

  constructor(private playerProfileService: CharacterProfileService,
              private route: ActivatedRoute) {
  }

  ngOnInit() {
    this.sub = this.route.params.subscribe(params => {
      let name = params['name'];
      this.playerProfileService.getPlayer(name)
        .then(p => this.character = p)
        .catch(e => this.error = e);
    });
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

}
