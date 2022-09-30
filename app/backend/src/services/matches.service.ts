import MatchModel from '../models/matches.models';
import IMatch from '../interfaces/matches.interface';

export default class MatchesService {
  static async findAll(inProgress: number | null): Promise<IMatch[]> {
    if (inProgress === 1 || inProgress === 0) {
      return MatchModel.findAllInProgress(inProgress);
    }
    return MatchModel.findAll();
  }
}
