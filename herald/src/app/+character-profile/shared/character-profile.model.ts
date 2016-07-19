import {Realm} from '../../shared/realm.enum';
import {Tradeskill} from './tradeskill.model';
import {RvrKillStats} from './rvr-kill-stats.model';
import {PveKill} from './pve-kill.model';

export class CharacterProfile {
  constructor(public name: string,
              public className: string,
              public raceName: string,
              public realm: Realm,
              public guildName: string,
              public level: number,
              public xpPercent: number,
              public realmRankDecimal: number,
              public realmRankPercent: number,
              public realmLevelPercent: number,
              public guildEmblemId: number,
              public relicsCaptured: number,
              public keepsCaptured: number,
              public keepBossesKilled: number,
              public killDeathRatio: number,
              public soloKillRatio: number,
              public tradeskills: Tradeskill[],
              public rvrStats: RvrKillStats,
              public pveKills: PveKill[],
              /**
               * specific array order: Briton, Saracen, Highlander, Avalonian, Inconnu
               */
              public albRaceKills: number[],
              /**
               * specific array order: Celt, Lurikeen, Firbolg, Elf, Sylvan
               */
              public hibRaceKills: number[],
              /**
               * specific array order: Norse, Kobold, Troll, Dwarf, Valkyn
               */
              public midRaceKills: number[],
              /**
               * specific array order: Armsman, Cabalist, Cleric, Friar, Infiltrator,
               * Mercenary, Minstrel, Necromancer, Paladin, Reaver, Scout, Sorcerer, Theurgist, Wizard
               */
              public albClassKills: number[],
              /**
               * specific array order: Berserker, Bonedancer, Healer, Hunter, Runemaster,
               * Savage, Shadowblade, Shaman, Skald, Spiritmaster, Thane, Warrior
               */
              public hibClassKills: number[],
              /**
               * specific array order: Animist, Bard, Blademaster, Champion, Druid, Eldritch,
               * Enchanter, Hero, Mentalist, Nightshade, Ranger, Valewalker, Warden
               */
              public midClassKills: number[]) {
  };


  /**
   * Gets the rank portion of the RR such as the 5 in "5L1"
   * @returns {number}
   */
  realmRankRank(): number {
    return Math.floor(+this.realmRankDecimal);
  }

  /**
   * Gets the level portion of the RR such as the 1 in "5L1"
   * @returns {number}
   */
  realmRankLevel(): number {
    return Number(((this.realmRankDecimal || 0) % 1).toFixed(1)) * 10;
  }

  /**
   * Gets the full realm rank string such as "5L1"
   * @returns {string}
   */
  realmRankFull(): string {
    return this.realmRankDecimal.toFixed(1).replace('.', 'L');
  }
}
