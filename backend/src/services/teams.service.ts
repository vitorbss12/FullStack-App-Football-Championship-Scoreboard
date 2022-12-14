import TeamsModel from '../models/teams.models';
import ITeam from '../interfaces/team.interface';

export default class TeamsService {
  static async findAll(): Promise<ITeam[] | null> {
    return TeamsModel.findAll();
  }

  static async findByPk(id: number): Promise<ITeam | null> {
    return TeamsModel.findByPk(id);
  }
}
