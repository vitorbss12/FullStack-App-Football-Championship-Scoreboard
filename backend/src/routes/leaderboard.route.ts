import { Router } from 'express';

import LeaderboardsController from '../controllers/leaderboard.controller';

const leaderboardsRouter = Router();

leaderboardsRouter.get('/home', LeaderboardsController.homeTeamsGetAll);
leaderboardsRouter.get('/away', LeaderboardsController.awayTeamsGetAll);
leaderboardsRouter.get('/', LeaderboardsController.fullTeamsGetAll);

export default leaderboardsRouter;
