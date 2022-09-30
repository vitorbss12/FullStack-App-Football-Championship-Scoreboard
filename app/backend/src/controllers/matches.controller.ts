import { Request, Response } from 'express';
import MatchesService from '../services/matches.service';

export default class MatchesController {
  static findAll = async (req: Request, res: Response) => {
    const { inProgress } = req.query;

    if (inProgress) {
      const filter = inProgress === 'true' ? 1 : 0;
      const matches = await MatchesService.findAll(filter);
      return res.status(200).json(matches);
    }

    const matches = await MatchesService.findAll(null);

    return res.status(200).json(matches);
  };
}
