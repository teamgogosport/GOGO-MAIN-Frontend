'use client';

import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { AnimationDisplayContainer } from '@/entities/mini-game';
import {
  YavarweeAnimation,
  YavarweeButton,
} from '@/entities/mini-game/yavarwee';
import { YavarweeForm } from '@/shared/types/mini-game/yavarwee';
import BackPageButton from '@/shared/ui/backPageButton';
import { cn } from '@/shared/utils/cn';
import { useGetBetLimit } from '@/views/mini-game/model/useGetBetLimit';
import { useGetMyPointQuery } from '@/views/mini-game/model/useGetMyPointQuery';
import { useGetMyTicketQuery } from '@/views/mini-game/model/useGetMyTicketQuery';
import { ControlForm } from '@/widgets/mini-game';
import { RoundContainer } from '@/widgets/mini-game/yavarwee';
import { useBetYavarweeMutation } from '../../model/useBetYavarweeMutation';
import { useComfirmYavarweeMutation } from '../../model/useComfirmYavarweeMutation';

const YavarweePage = () => {
  const params = useParams<{ stageId: string }>();
  const { stageId } = params;
  const { data: myPointData } = useGetMyPointQuery(stageId);
  const { data: myTicketData } = useGetMyTicketQuery(stageId);
  const { data: betLimitData } = useGetBetLimit(stageId);
  const { register, handleSubmit, watch, setValue, reset } =
    useForm<YavarweeForm>();

  const serverPoint = myPointData?.point || 0;
  const serverTicket = myTicketData?.yavarwee || 0;
  const minBetLimit = betLimitData?.yavarwee.minBetPoint || 0;
  const maxBetLimit = betLimitData?.yavarwee.maxBetPoint || 0;

  const [gameState, setGameState] = useState<
    | 'idle'
    | 'betting'
    | 'showing'
    | 'hiding'
    | 'shuffling'
    | 'selecting'
    | 'result'
    | 'round'
  >('idle');

  const [ballPosition, setBallPosition] = useState<number | null>(null);
  const [cupPositions, setCupPositions] = useState<number[]>([0, 1, 2]);
  const [userSelection, setUserSelection] = useState<number | null>(null);
  const [result, setResult] = useState<'correct' | 'wrong' | null>(null);
  const [round, setRound] = useState<number>(1);
  const [betUuid, setBetUuid] = useState<string | null>(null);
  const [localPoint, setLocalPoint] = useState<number>(serverPoint);
  const [localTicket, setLocalTicket] = useState<number>(serverTicket);

  const { mutate: betYavarwee, isPending: betIsPending } =
    useBetYavarweeMutation(stageId);
  const { mutate: comfirmYavarwee, isPending: comfirmIsPending } =
    useComfirmYavarweeMutation(stageId);

  useEffect(() => {
    setLocalPoint(serverPoint);
  }, [serverPoint]);

  useEffect(() => {
    setLocalTicket(serverTicket);
  }, [serverTicket]);

  useEffect(() => {
    if (gameState === 'selecting') {
      const timer = setTimeout(() => {
        if (userSelection === null) {
          comfirmYavarwee(
            {
              uuid: betUuid!,
              round,
              status: false,
            },
            {
              onSuccess: () => {
                toast.error(
                  '컵 선택 제한 시간(3초)을 지나서 야바위를 종료합니다.',
                );
                setRound(1);
                reset();
                setGameState('idle');
              },
            },
          );
        }
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, [gameState, userSelection, betUuid, round, reset, comfirmYavarwee]);

  const startGameWithRound = (currentRound: number) => {
    setGameState('showing');
    const randomPosition = Math.floor(Math.random() * 3);
    setBallPosition(randomPosition);
    setCupPositions([0, 1, 2]);
    setUserSelection(null);
    setResult(null);

    setTimeout(() => {
      setGameState('hiding');
      setTimeout(() => {
        setGameState('shuffling');
        performShuffleAnimation(currentRound);
      }, 1000);
    }, 2000);
  };

  const getShuffleCountForRound = (round: number): number => {
    const ranges: Record<number, [number, number]> = {
      1: [12, 16],
      2: [16, 20],
      3: [20, 25],
      4: [25, 30],
      5: [35, 45],
    };

    const [min, max] = ranges[round];
    return Math.floor(Math.random() * (max - min + 1)) + min;
  };

  const getShuffleAnimationDurationForRound = (round: number): number => {
    const durations: Record<number, number> = {
      1: 800,
      2: 600,
      3: 400,
      4: 300,
      5: 200,
    };

    return durations[round] || 1000;
  };

  const performShuffleAnimation = (currentRound: number) => {
    const current = [...cupPositions];
    const shuffleCount = getShuffleCountForRound(currentRound);
    const shuffleDuration = getShuffleAnimationDurationForRound(currentRound);
    const shuffles: [number, number][] = [];

    for (let i = 0; i < shuffleCount; i++) {
      const a = Math.floor(Math.random() * 3);
      let b = Math.floor(Math.random() * 3);
      while (a === b) b = Math.floor(Math.random() * 3);
      [current[a], current[b]] = [current[b], current[a]];
      shuffles.push([a, b]);
    }

    let delay = 0;
    shuffles.forEach(([a, b]) => {
      setTimeout(() => {
        setCupPositions((prev) => {
          const next = [...prev];
          [next[a], next[b]] = [next[b], next[a]];
          return next;
        });
      }, delay);
      delay += shuffleDuration;
    });

    setTimeout(() => {
      setGameState('selecting');
    }, delay);
  };

  const selectCup = (selectedIdx: number) => {
    if (gameState !== 'selecting') return;

    setUserSelection(selectedIdx);
    const originalCupId = cupPositions[selectedIdx];
    const correct = originalCupId === ballPosition;

    setResult(correct ? 'correct' : 'wrong');
    setGameState('result');

    setTimeout(() => {
      if (correct) {
        if (round >= 5) {
          comfirmYavarwee(
            {
              uuid: betUuid!,
              round,
              status: true,
            },
            {
              onSuccess: () => {
                toast.success('야바위 라운드 종료 포인트를 정산합니다.');
                setRound(1);
                reset();
                setGameState('idle');
              },
            },
          );
        } else {
          setGameState('round');
        }
      } else {
        comfirmYavarwee(
          {
            uuid: betUuid!,
            round,
            status: false,
          },
          {
            onSuccess: () => {
              toast.error('야바위 배팅에 실패했습니다.');
              setRound(1);
              reset();
              setGameState('idle');
            },
          },
        );
      }
    }, 1500);
  };

  const handleNextRound = () => {
    const nextRound = round + 1;
    setRound(nextRound);
    startGameWithRound(nextRound);
  };

  const handleStopGame = () => {
    comfirmYavarwee(
      {
        uuid: betUuid!,
        round,
        status: true,
      },
      {
        onSuccess: () => {
          toast.success('야바위 라운드 종료 포인트를 정산합니다.');
          setRound(1);
          reset();
          setGameState('idle');
        },
      },
    );
  };

  return (
    <div
      className={cn(
        'flex',
        'w-full',
        'items-center',
        'justify-center',
        'px-[1rem]',
        'py-[80px]',
      )}
    >
      <form
        onSubmit={handleSubmit((data) => {
          if (gameState === 'betting') {
            const parsedData = {
              ...data,
              amount: Number(data.amount),
            };

            betYavarwee(parsedData, {
              onSuccess: (res) => {
                const amountValue = Number(watch('amount'));
                setLocalPoint((prev) => prev - amountValue);
                setLocalTicket((prev) => prev - 1);
                setBetUuid(res.uuid);
                startGameWithRound(round);
              },
            });
          }
        })}
        className={cn(
          'w-full',
          'max-w-[1320px]',
          'space-y-[80px]',
          'mobile:space-y-[40px]',
        )}
      >
        <BackPageButton label="야바위" type="back" />

        <div className={cn('space-y-24')}>
          <RoundContainer currentRound={round} />
          <AnimationDisplayContainer>
            <YavarweeAnimation
              gameState={gameState}
              cupPositions={cupPositions}
              ballPosition={ballPosition}
              userSelection={userSelection}
              result={result}
              startGame={() => setGameState('betting')}
              onNextRound={handleNextRound}
              onStopGame={handleStopGame}
              shuffleDuration={getShuffleAnimationDurationForRound(round)}
            />
          </AnimationDisplayContainer>
        </div>

        <div className={cn('flex', 'w-full', 'justify-center')}>
          <div className={cn('flex', 'w-full', 'justify-evenly', 'gap-16')}>
            {['1', '2', '3'].map((num, idx) => (
              <div key={num} className={cn('w-full', 'max-w-[182px]')}>
                <YavarweeButton
                  number={num as '1' | '2' | '3'}
                  onBet={(value) => {
                    if (gameState === 'selecting') {
                      setValue('bet', value);
                      selectCup(idx);
                    }
                  }}
                  isPending={comfirmIsPending}
                />
              </div>
            ))}
          </div>
        </div>

        <ControlForm
          point={localPoint}
          ticket={localTicket}
          register={register}
          isPending={betIsPending}
          watch={watch}
          isPlaying={gameState !== 'betting'}
          minBetLimit={minBetLimit}
          maxBetLimit={maxBetLimit}
          type="yavarwee"
        />
      </form>
    </div>
  );
};

export default YavarweePage;
