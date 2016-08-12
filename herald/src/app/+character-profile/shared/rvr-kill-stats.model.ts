/**
 * Class to hold the RvR kill statistics of a character
 */
export class RvrKillStats {
  constructor(public albKills: number,
              public hibKills: number,
              public midKills: number,
              public deathblows: number,
              public soloKills: number,
              public killedMostNumKills: number,
              public killedMostName: string,
              public killedByMostNumKills: number,
              public killedByMostName: string) {
  };

  /**
   * Gets the total rvr kills (across all other realms)
   * @returns {number}
   */
  totalKills(): number {
    return this.albKills + this.hibKills + this.midKills;
  }
}
