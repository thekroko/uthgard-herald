/**
 * Simple class to represent a statistic of the number of times a mob was killed by a player.
 */
export class PveKill {
  constructor(public mobName: string,
              public numKills: number) {
  };
}
