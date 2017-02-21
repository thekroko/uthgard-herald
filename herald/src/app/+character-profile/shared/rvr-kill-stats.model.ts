/**
 * Class to hold the RvR kill statistics of a character
 */
export class RvrKillStats {
  constructor(public albKills: number = 0,
              public hibKills: number = 0,
              public midKills: number = 0,
              public deathblows: number = 0,
              public soloKills: number = 0,
              public killedMostNumKills: number = 0,
              public killedMostName: string = '',
              public killedByMostNumKills: number = 0,
              public killedByMostName: string = '') {
  };

  /**
   * Gets the total rvr kills (across all other realms)
   * @returns {number}
   */
  totalKills(): number {
    return this.albKills + this.hibKills + this.midKills;
  }
}
