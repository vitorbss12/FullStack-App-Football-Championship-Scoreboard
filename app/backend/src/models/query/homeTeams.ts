const homeTeamsQuery = `
SELECT
  main.name,
  ((main.totalVictories * 3) + totalDraws) as totalPoints,
    main.totalGames,
    main.totalVictories,
    main.totalDraws,
    main.totalLosses,
    main.goalsFavor,
    main.goalsOwn,
    (main.goalsFavor - main.goalsOwn) as goalsBalance
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
    m.home_team = t.id
  GROUP BY
    name
  ) as main
    ORDER BY
    totalVictories DESC,
        goalsBalance DESC,
        goalsFavor DESC,
        goalsOwn DESC;`;

export default homeTeamsQuery;
