import { Router } from 'express';

import LeaderboardsController from '../controllers/leaderboard.controller';

const leaderboardsRouter = Router();

leaderboardsRouter.get('/', LeaderboardsController.findAll);

export default leaderboardsRouter;
