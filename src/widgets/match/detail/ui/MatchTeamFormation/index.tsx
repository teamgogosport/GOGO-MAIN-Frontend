import DetailFormation from '@/entities/match/detail/ui/DetailFormation';
import { TeamType } from '@/shared/types/my/bet';
import { cn } from '@/shared/utils/cn';
import { useGetTeamDetail } from '@/views/match/model/useGetTeamDetail';

interface TeamFormationProps {
  ateam: TeamType;
  bteam: TeamType;
  category:
    | 'SOCCER'
    | 'BASKET_BALL'
    | 'BASE_BALL'
    | 'VOLLEY_BALL'
    | 'BADMINTON'
    // | 'LOL'
    | 'ETC';
}

const MatchTeamFormation = ({ ateam, bteam, category }: TeamFormationProps) => {
  const { data: team1DetailData } = useGetTeamDetail(ateam.teamId);
  const { data: team2DetailData } = useGetTeamDetail(bteam.teamId);

  return (
    <div
      className={cn('flex', 'w-full', 'flex-col', 'pad:gap-[1.5rem]', 'gap-0')}
    >
      <div className={cn('flex', 'w-full', 'justify-between', 'items-center')}>
        <p className={cn('pad:text-h4e', 'text-body3e', 'text-white')}>
          팀 정보
        </p>
        <div
          className={cn(
            'flex',
            'items-center',
            'pad:gap-[1.5rem]',
            'gap-[0.75rem]',
          )}
        >
          <div
            className={cn(
              'flex',
              'items-center',
              'pad:gap-[0.75rem]',
              'gap-[0.5rem]',
            )}
          >
            <div
              className={cn(
                'pad:w-[2.25rem]',
                'pad:h-[2.25rem]',
                'w-[1.5rem]',
                'h-[1.5rem]',
                'rounded-md',
                'bg-[#73B2FF]',
              )}
            />
            <p className={cn('pad:text-body1e', 'text-body3e', 'text-white')}>
              {ateam.teamName}
            </p>
          </div>

          <div className={cn('flex', 'items-center', 'gap-[0.75rem]')}>
            <div
              className={cn(
                'pad:w-[2.25rem]',
                'pad:h-[2.25rem]',
                'w-[1.5rem]',
                'h-[1.5rem]',
                'rounded-md',
                'bg-[#FF8282]',
              )}
            />
            <p className={cn('pad:text-body1e', 'text-body3e', 'text-white')}>
              {bteam.teamName}
            </p>
          </div>
        </div>
      </div>

      <DetailFormation
        category={category}
        team1DetailData={team1DetailData}
        team2DetailData={team2DetailData}
      />
    </div>
  );
};

export default MatchTeamFormation;
