interface SingleGame {
  teamAId: number;
  teamBId: number;
  startDate: string;
  endDate: string;
}

interface TournamentGame {
  teamAId?: number;
  teamBId?: number;
  round:
    | 'ROUND_OF_32'
    | 'ROUND_OF_16'
    | 'QUARTER_FINALS'
    | 'SEMI_FINALS'
    | 'FINALS';
  turn: number;
  startDate: string;
  endDate: string;
}

interface FullLeagueGame {
  teamAId: number;
  teamBId: number;
  leagueTurn: number;
  startDate: string;
  endDate: string;
}

interface Game {
  gameId: number;
  system: 'SINGLE' | 'TOURNAMENT' | 'FULL_LEAGUE';
  single?: SingleGame;
  tournament?: TournamentGame[];
  fullLeague?: FullLeagueGame[];
}

interface PostStageRequest {
  games: Game[];
}

export type { Game, PostStageRequest };

export const GameSystem = {
  TOURNAMENT: 'TOURNAMENT',
  FULL_LEAGUE: 'FULL_LEAGUE',
  SINGLE: 'SINGLE',
} as const;

export type GameSystem = (typeof GameSystem)[keyof typeof GameSystem];

export const GAME_SYSTEM_VALUES = Object.values(GameSystem);

export const isValidGameSystem = (value: string): value is GameSystem => {
  return GAME_SYSTEM_VALUES.includes(value as GameSystem);
};
