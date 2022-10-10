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

  static async findByPk(id: number): Promise<IMatch | null> {
    return Matches.findByPk(id);
  }

  static async create(match: IMatch): Promise<IMatch> {
    return Matches.create({ ...match, inProgress: 1 });
  }

  static async update(
    id: number,
    homeTeamGoals: number,
    awayTeamGoals: number,
  ): Promise<[number, IMatch[]]> {
    return Matches.update({ homeTeamGoals, awayTeamGoals }, { where: { id } });
  }

  static async updateProgress(id: number): Promise<[number, IMatch[]]> {
    return Matches.update({ inProgress: 0 }, { where: { id } });
  }
}
