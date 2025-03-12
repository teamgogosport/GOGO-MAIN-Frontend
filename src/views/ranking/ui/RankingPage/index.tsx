import React from 'react';
import { RankingData, RankItem } from '@/shared/types/ranking';
import BackPageButton from '@/shared/ui/backPageButton';
import { cn } from '@/shared/utils/cn';
import { RankingUserContainer, TopRankListContainer } from '@/widgets/ranking';
import { getRankingMock } from '../../Mock/getRankingMock';

const RankingPage = () => {
  const rankingData: RankingData = getRankingMock();
  const topThreeRanks: RankItem[] = rankingData.rank.slice(0, 3);

  const reorderedTopThreeRanks: RankItem[] = [
    topThreeRanks[1],
    topThreeRanks[0],
    topThreeRanks[2],
  ];

  const remainingRanks: RankItem[] = rankingData.rank.slice(3);

  return (
    <div
      className={cn(
        'w-full',
        'max-w-[82.5rem]',
        'flex',
        'flex-col',
        'space-y-[3rem]',
      )}
    >
      <BackPageButton type="back" />
      <div className={cn('space-y-[2.25rem]')}>
        <TopRankListContainer topRanks={reorderedTopThreeRanks} />
        <RankingUserContainer remainingRanks={remainingRanks} />
      </div>
    </div>
  );
};

export default RankingPage;
