import axios from 'axios';
import clientInstance from '@/shared/libs/http/clientInstance';
import { MatchGamesResponse } from '@/shared/types/stage/apply';

export const getMatchApplyList = async (
  stageId: number,
): Promise<MatchGamesResponse> => {
  try {
    const response = await clientInstance.get<MatchGamesResponse>(
      `/stage/game/${stageId}`,
    );
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      throw new Error(
        error.response.data.error ||
          '스테이지에 등록된 경기조회를 실패 했습니다.',
      );
    }
    throw error;
  }
};
