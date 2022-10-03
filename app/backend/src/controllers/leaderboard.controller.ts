import { Response, Request } from 'express';
import LeaderboardsService from '../services/leaderboards.sevice';

export default class LeaderboardsController {
  static async findAll(_req: Request, res: Response) {
    const leaderboards = await LeaderboardsService.getTeamsInfo();
    res.status(200).json(leaderboards);
  }
}
