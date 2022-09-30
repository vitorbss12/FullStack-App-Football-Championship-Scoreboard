import Matches from '../database/models/Matches';
import Teams from '../database/models/Teams';
import IMatch from '../interfaces/matches.interface';

export default class MatchModel {
  static async findAll(): Promise<IMatch[]> {
    return Matches.findAll(
      {
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

  static async findAllInProgress(inProgress: number): Promise<IMatch[]> {
    return Matches.findAll(
      {
        where: { inProgress },
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
