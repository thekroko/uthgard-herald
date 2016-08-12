import {CharacterProfile} from './character-profile.model';
import {Tradeskill} from './tradeskill.model';
import {RvrKillStats} from './rvr-kill-stats.model';
import {Realm} from '../../shared/realm.enum';
import {PveKill} from './pve-kill.model';

export const mockPlayerProfiles: CharacterProfile[] = [
  new CharacterProfile('Burfo', 'Cleric', 'Briton', Realm.Albion, 'Clan Cotswold', 11, 0.12, 1.2, 0.7, 0.20, 38666, 99,
    99, 99, 4.37, 0.005, [new Tradeskill('Armorsmithing', 123), new Tradeskill('Weaponsmithing', 1100)],
    new RvrKillStats(0, 500, 500, 2, 17, 30, 'SomeEnemy', 10, 'Bobby'), [new PveKill('Sample Mob', 10),
      new PveKill('Sample Mob2', 32)], [200, 400, 600, 800, 1000], [200, 400, 600, 800, 1300],
    [200, 400, 600, 800, 1800], [11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24],
    [21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32], [31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43]),
  new CharacterProfile('Testchar', 'Healer', 'Celt', Realm.Hibernia, 'Clan Cotswold', 11, 0.12, 1.2, 0.7, 0.20, 38666, 99,
    99, 99, 4.37, 0.005, [new Tradeskill('Armorsmithing', 123), new Tradeskill('Weaponsmithing', 1100)],
    new RvrKillStats(0, 500, 500, 2, 17, 30, 'Burfo', 10, 'SomeEnemy'), [new PveKill('Sample Mob', 10),
     new PveKill('Sample Mob2', 32)], [200, 400, 600, 800, 1000], [200, 400, 600, 800, 1300],
    [200, 400, 600, 800, 1800], [11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24],
    [21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32], [31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43])
];
