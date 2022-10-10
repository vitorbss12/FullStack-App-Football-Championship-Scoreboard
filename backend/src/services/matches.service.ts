import MatchModel from '../models/matches.models';
import IMatch from '../interfaces/matches.interface';

export default class MatchesService {
  static async findAll(inProgress: number | null): Promise<IMatch[]> {
    if (inProgress === 1 || inProgress === 0) {
      return MatchModel.findAllInProgress(inProgress);
    }
    return MatchModel.findAll();
  }

  static async findByPk(id: number): Promise<IMatch | null> {
    return MatchModel.findByPk(id);
  }

  static async create(match: IMatch): Promise<IMatch> {
    return MatchModel.create(match);
  }

  static async update(
    id: number,
    homeTeamGoals: number,
    awayTeamGoals: number,
  ): Promise<[number, IMatch[]]> {
    return MatchModel.update(id, homeTeamGoals, awayTeamGoals);
  }

  static async updateProgress(id: number): Promise<[number, IMatch[]]> {
    return MatchModel.updateProgress(id);
  }
}
