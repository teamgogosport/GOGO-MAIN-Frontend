'use client';

import PasswordModal from '@/entities/stage/ui/PasswordModal';
import { LeftArrow, RightArrowIcon } from '@/shared/assets/svg';
import useStageNavigation from '@/shared/model/useStageNavigation';
import { usePasswordModalStore } from '@/shared/stores';
import { MatchResponse } from '@/shared/types/my/bet';
import { StagesType } from '@/shared/types/stage';
import { cn } from '@/shared/utils/cn';
import StageMatchContainer from '../stageMatchContainer';

interface StageSectionProps {
  title?: string;
  stages?: StagesType[];
  matches?: MatchResponse;
}

const StageMatchSection = ({ title, stages, matches }: StageSectionProps) => {
  const visibleCount = 2;

  const { isPasswordModalOpen, setIsPasswordModalOpen } =
    usePasswordModalStore();

  const totalStages = stages?.length ?? 0;
  const totalMatches = matches?.matches.length ?? 0;

  const {
    startIndex: stageStartIndex,
    handlePrev: handlePrevStage,
    handleNext: handleNextStage,
  } = useStageNavigation(totalStages, visibleCount);

  const {
    startIndex: matchStartIndex,
    handlePrev: handlePrevMatch,
    handleNext: handleNextMatch,
  } = useStageNavigation(totalMatches, visibleCount);

  return (
    <div className={cn('flex', 'w-full', 'flex-col', 'gap-[2.5rem]')}>
      {title && <h2 className={cn('text-body1e', 'text-white')}>{title}</h2>}
      {totalStages > 0 && (
        <div className={cn('relative', 'flex w-full')}>
          {stageStartIndex > 0 && (
            <button
              className={cn(
                'absolute left-[-4%] top-1/2 z-10 -translate-y-1/2',
              )}
              onClick={handlePrevStage}
            >
              <LeftArrow color="#6B6B6B" />
            </button>
          )}

          <StageMatchContainer
            stageInfo={{ stages: stages ?? [] }}
            matches={matches}
            startIndex={stageStartIndex}
          />

          {stageStartIndex < totalStages - visibleCount && (
            <button
              className={cn(
                'absolute right-[-4%] top-1/2 z-10 -translate-y-1/2',
              )}
              onClick={handleNextStage}
            >
              <RightArrowIcon size="2.5rem" />
            </button>
          )}
        </div>
      )}

      <div className={cn('relative flex w-full')}>
        {matchStartIndex > 0 && (
          <button
            className={cn('absolute left-[-4%] top-1/2 z-10 -translate-y-1/2')}
            onClick={handlePrevMatch}
          >
            <LeftArrow color="#6B6B6B" />
          </button>
        )}

        {totalMatches > 0 && (
          <StageMatchContainer
            stageInfo={{ stages: [] }}
            matches={matches}
            startIndex={matchStartIndex}
          />
        )}

        {matchStartIndex < totalMatches - visibleCount && (
          <button
            className={cn('absolute right-[-4%] top-1/2 z-10 -translate-y-1/2')}
            onClick={handleNextMatch}
          >
            <RightArrowIcon size="2.5rem" />
          </button>
        )}
      </div>

      {isPasswordModalOpen && (
        <PasswordModal onClose={() => setIsPasswordModalOpen(false)} />
      )}
    </div>
  );
};

export default StageMatchSection;
