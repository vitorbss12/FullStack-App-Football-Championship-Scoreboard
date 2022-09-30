import MatchModel from '../models/matches.models';
import IMatch from '../interfaces/matches.interface';

export default class MatchesService {
  static async findAll(): Promise<IMatch[]> {
    return MatchModel.findAll();
  }
}
