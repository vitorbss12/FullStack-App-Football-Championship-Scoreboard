import Teams from '../database/models/Teams';
import Matches from '../database/models/Matches';

export default class LeaderboardsModel {
  static async findAll(): Promise<Matches[]> {
    return Matches.findAll(
      {
        where: { inProgress: false },
        attributes: ['homeTeamGoals', 'awayTeamGoals'],
        include: [
          {
            model: Teams,
            as: 'teamHome',
            attributes: ['teamName'],
          },
          {
            model: Teams,
            as: 'teamAway',
            attributes: ['teamName'],
          },
        ],
      },
    );
  }
}
