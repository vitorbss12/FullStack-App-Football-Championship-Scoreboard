import Teams from '../database/models/Teams';
import ITeam from '../interfaces/team.interface';

export default class TeamsModel {
  static async findAll(): Promise<ITeam[]> {
    return Teams.findAll();
  }
}
