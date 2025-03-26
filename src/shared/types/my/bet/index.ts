export type MatchData = {
  matchId: number;
  ateam: {
    teamId: number;
    teamName: string;
    bettingPoint: number;
    winCount: number;
  };
  bteam: {
    teamId: number;
    teamName: string;
    bettingPoint: number;
    winCount: number;
  };
  startDate: string;
  endDate: string;
  isEnd: boolean;
  round?:
    | 'ROUND_OF_32'
    | 'ROUND_OF_16'
    | 'QUARTER_FINALS'
    | 'SEMI_FINALS'
    | 'FINALS';
  category:
    | 'SOCCER'
    | 'BASKET_BALL'
    | 'BASE_BALL'
    | 'VOLLEY_BALL'
    | 'BADMINTON'
    | 'LOL'
    | 'ETC';
  system?: 'TOURNAMENT' | 'FULL_LEAGUE' | 'SINGLE';
  turn?: number;
  isNotice: boolean;
  isPlayer: boolean;
  betting: {
    isBetting: boolean;
    bettingPoint?: number;
    predictedWinTeamId?: number;
  };
  result?: {
    victoryTeamId: number;
    aTeamScore: number;
    bTeamScore: number;
    isPredictionSuccess?: boolean;
    earnedPoint?: number;
    tempPointExpiredDate: string;
  };
};

export type MatchResponse = {
  count: number;
  matches: MatchData[];
};

export type TempPoint = {
  tempPointId: number;
  tempPoint: number;
  expiredDate: string;
};

export type TempPointsResponse = {
  tempPoints: TempPoint[];
};
