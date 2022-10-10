const fullTeamsQuery = `
  SELECT 
    home.name,
    (((home.totalVictories * 3) + home.totalDraws) + ((away.totalVictories * 3) + away.totalDraws)
    ) as totalPoints,
    home.totalGames + away.totalGames as totalGames,
    home.totalVictories + away.totalVictories as totalVictories,
    home.totalDraws + away.totalDraws as totalDraws,
    home.totalLosses + away.totalLosses as totalLosses,
    home.goalsFavor + away.goalsFavor as goalsFavor,
    home.goalsOwn + away.goalsOwn as goalsOwn,
    ((home.goalsFavor + away.goalsFavor) - (home.goalsOwn + away.goalsOwn)) as goalsBalance
  FROM
    (SELECT
      t.team_name as name,
      SUM(
        CASE m.in_progress
        WHEN false THEN 1 ELSE 0
        END
      ) as totalGames,
      SUM(
        CASE (m.home_team_goals > m.away_team_goals)
        WHEN true THEN 1 ELSE 0
        END
      ) as totalVictories,
      SUM(
        CASE (m.home_team_goals = m.away_team_goals)
        WHEN true THEN 1 ELSE 0
        END
      ) as totalDraws,
      SUM(
        CASE (m.home_team_goals < m.away_team_goals)
        WHEN true THEN 1 ELSE 0
        END
      ) as totalLosses,
      SUM(m.home_team_goals) as goalsFavor,
      SUM(m.away_team_goals) as goalsOwn
    FROM
      TRYBE_FUTEBOL_CLUBE.matches as m
    INNER JOIN
      TRYBE_FUTEBOL_CLUBE.teams as t
    ON
      m.home_team = t.id AND m.in_progress = 0
    GROUP BY
      name
    ) as home,
    (SELECT
      t.team_name as name,
      SUM(
        CASE m.in_progress
        WHEN false THEN 1 ELSE 0
        END
      ) as totalGames,
      SUM(
        CASE (m.away_team_goals > m.home_team_goals)
        WHEN true THEN 1 ELSE 0
        END
      ) as totalVictories,
      SUM(
        CASE (m.home_team_goals = m.away_team_goals)
        WHEN true THEN 1 ELSE 0
        END
      ) as totalDraws,
      SUM(
        CASE (m.away_team_goals < m.home_team_goals)
        WHEN true THEN 1 ELSE 0
        END
      ) as totalLosses,
      SUM(m.away_team_goals) as goalsFavor,
      SUM(m.home_team_goals) as goalsOwn
    FROM
      TRYBE_FUTEBOL_CLUBE.matches as m
    INNER JOIN
      TRYBE_FUTEBOL_CLUBE.teams as t
    ON
      m.away_team = t.id AND m.in_progress = 0
    GROUP BY
      name
    ) as away
  WHERE home.name = away.name
  GROUP BY name
  ORDER BY
    totalPoints DESC,
    totalVictories DESC,
    goalsBalance DESC,
    goalsFavor DESC,
    goalsOwn DESC;`;

export default fullTeamsQuery;
