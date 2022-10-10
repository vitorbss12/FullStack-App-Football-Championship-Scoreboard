import { Response, Request } from 'express';
import LeaderboardsService from '../services/leaderboards.sevice';

export default class LeaderboardsController {
  static async homeTeamsGetAll(_req: Request, res: Response) {
    const homeTeams = await LeaderboardsService.homeTeamsGetAll();
    return res.status(200).json(homeTeams);
  }

  static async awayTeamsGetAll(_req: Request, res: Response) {
    const awayTeams = await LeaderboardsService.awayTeamsGetAll();
    return res.status(200).json(awayTeams);
  }

  static async findAll(_req: Request, res: Response) {
    const leaderboards = await LeaderboardsService.getTeamsInfo();
    res.status(200).json(leaderboards);
  }
}
