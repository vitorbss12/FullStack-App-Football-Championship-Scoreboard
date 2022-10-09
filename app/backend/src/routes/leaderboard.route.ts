import { Router } from 'express';

import LeaderboardsController from '../controllers/leaderboard.controller';

const leaderboardsRouter = Router();

leaderboardsRouter.get('/home', LeaderboardsController.homeTeamsGetAll);
leaderboardsRouter.get('/', LeaderboardsController.findAll);

export default leaderboardsRouter;
