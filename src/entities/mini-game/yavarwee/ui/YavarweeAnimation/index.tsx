import React, { useEffect, useRef, useState } from 'react';
import { cn } from '@/shared/utils/cn';

type GameState =
  | 'idle'
  | 'betting'
  | 'showing'
  | 'hiding'
  | 'shuffling'
  | 'selecting'
  | 'result'
  | 'round';
type Result = 'correct' | 'wrong' | null;

type Props = {
  gameState: GameState;
  cupPositions: number[];
  ballPosition: number | null;
  userSelection: number | null;
  result: Result;
  startGame: () => void;
  onNextRound: () => void;
  onStopGame: () => void;
  shuffleDuration: number;
};

const CANVAS_WIDTH = 900;
const CANVAS_HEIGHT = 300;
const CUP_WIDTH = 210;
const CUP_HEIGHT = 210;
const BALL_SIZE = 75;
const CUP_SPACING = 240;
const SELECTION_TIMER_DURATION = 3000;

interface CupState {
  x: number;
  y: number;
  targetX: number;
  targetY: number;
  zIndex: number;
  originalId: number;
  animationProgress: number;
  animationDuration: number;
}

interface BallState {
  x: number;
  y: number;
  visible: boolean;
  scale: number;
}

const YavarweeAnimation = ({
  gameState,
  cupPositions,
  ballPosition,
  userSelection,
  result,
  startGame,
  onNextRound,
  onStopGame,
  shuffleDuration,
}: Props) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const cupImageRef = useRef<HTMLImageElement | null>(null);
  const ballImageRef = useRef<HTMLImageElement | null>(null);
  const animationFrameRef = useRef<number>(0);
  const lastTimeRef = useRef<number>(0);
  const [timerProgress, setTimerProgress] = useState<number>(100);
  const timerStartTimeRef = useRef<number | null>(null);

  const cupCoordinates = [
    { x: CANVAS_WIDTH / 2 - CUP_SPACING },
    { x: CANVAS_WIDTH / 2 },
    { x: CANVAS_WIDTH / 2 + CUP_SPACING },
  ];

  const [cups, setCups] = useState<CupState[]>([
    {
      x: cupCoordinates[0].x,
      y: CANVAS_HEIGHT / 2,
      targetX: cupCoordinates[0].x,
      targetY: CANVAS_HEIGHT / 2,
      zIndex: 1,
      originalId: 0,
      animationProgress: 1,
      animationDuration: 300,
    },
    {
      x: cupCoordinates[1].x,
      y: CANVAS_HEIGHT / 2,
      targetX: cupCoordinates[1].x,
      targetY: CANVAS_HEIGHT / 2,
      zIndex: 1,
      originalId: 1,
      animationProgress: 1,
      animationDuration: 300,
    },
    {
      x: cupCoordinates[2].x,
      y: CANVAS_HEIGHT / 2,
      targetX: cupCoordinates[2].x,
      targetY: CANVAS_HEIGHT / 2,
      zIndex: 1,
      originalId: 2,
      animationProgress: 1,
      animationDuration: 300,
    },
  ]);

  const [ball, setBall] = useState<BallState>({
    x: CANVAS_WIDTH / 2,
    y: CANVAS_HEIGHT / 2 + 30,
    visible: false,
    scale: 1,
  });

  useEffect(() => {
    if (gameState === 'selecting') {
      const now = Date.now();
      timerStartTimeRef.current = now;
      setTimerProgress(100);

      const updateInterval = 30;

      const interval = setInterval(() => {
        const elapsedTime = Date.now() - (timerStartTimeRef.current || now);
        const remainingTime = Math.max(
          0,
          SELECTION_TIMER_DURATION - elapsedTime,
        );
        const newProgress = (remainingTime / SELECTION_TIMER_DURATION) * 100;

        setTimerProgress(newProgress);

        if (remainingTime <= 0) {
          clearInterval(interval);
        }
      }, updateInterval);

      return () => clearInterval(interval);
    }
  }, [gameState]);

  useEffect(() => {
    const cupImage = new Image();
    cupImage.src = '/cup.png';
    cupImage.onload = () => {
      cupImageRef.current = cupImage;
    };

    const ballImage = new Image();
    ballImage.src = '/ball.png';
    ballImage.onload = () => {
      ballImageRef.current = ballImage;
    };

    return () => {
      cancelAnimationFrame(animationFrameRef.current);
    };
  }, []);

  useEffect(() => {
    const newCups = [...cups];

    cupPositions.forEach((positionId, index) => {
      const cupIndex = cups.findIndex((cup) => cup.originalId === positionId);
      if (cupIndex !== -1) {
        const targetX = cupCoordinates[index].x;
        let targetY = CANVAS_HEIGHT / 2;
        let zIndex = 1;

        const isCupRevealed = (() => {
          if (gameState === 'showing') {
            return index === ballPosition;
          }

          if (gameState === 'result') {
            if (result === 'correct') {
              return index === userSelection;
            }
            if (result === 'wrong') {
              return positionId === ballPosition;
            }
          }

          return false;
        })();

        if (isCupRevealed) {
          targetY = CANVAS_HEIGHT / 2 - 75;
          zIndex = 10;
        }

        newCups[cupIndex] = {
          ...newCups[cupIndex],
          targetX,
          targetY,
          zIndex,
          animationProgress: 0,
          animationDuration: gameState === 'shuffling' ? shuffleDuration : 300,
        };
      }
    });

    setCups(newCups);

    if (ballPosition !== null) {
      const cupIndex = cupPositions.indexOf(ballPosition);
      const ballX = cupCoordinates[cupIndex].x;

      setBall((prev) => ({
        ...prev,
        x: ballX,
        visible: gameState === 'showing' || gameState === 'result',
        scale: gameState === 'showing' ? 0.8 : 1,
      }));
    }
  }, [gameState, cupPositions, ballPosition, userSelection, result]);

  useEffect(() => {
    const animate = (time: number) => {
      if (!lastTimeRef.current) {
        lastTimeRef.current = time;
      }

      const deltaTime = time - lastTimeRef.current;
      lastTimeRef.current = time;

      let animating = false;
      setCups((prevCups) => {
        return prevCups.map((cup) => {
          if (cup.animationProgress < 1) {
            const newProgress = Math.min(
              cup.animationProgress + deltaTime / cup.animationDuration,
              1,
            );
            animating = true;

            const t = 1 - Math.pow(1 - newProgress, 2);

            const x = cup.x + (cup.targetX - cup.x) * t;
            const y = cup.y + (cup.targetY - cup.y) * t;

            return {
              ...cup,
              x,
              y,
              animationProgress: newProgress,
            };
          }
          return cup;
        });
      });

      if (gameState === 'showing' && ball.scale < 1) {
        setBall((prev) => {
          const newScale = prev.scale + (deltaTime / 300) * 0.4;
          if (newScale <= 1.2) {
            animating = true;
            return {
              ...prev,
              scale: newScale,
            };
          } else {
            return {
              ...prev,
              scale: 1,
            };
          }
        });
      }

      renderCanvas();

      if (animating) {
        animationFrameRef.current = requestAnimationFrame(animate);
      }
    };

    animationFrameRef.current = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(animationFrameRef.current);
    };
  }, [gameState, cups, ball]);

  const renderCanvas = () => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext('2d');
    if (!canvas || !ctx || !cupImageRef.current || !ballImageRef.current)
      return;

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    const sortedCups = [...cups].sort((a, b) => a.zIndex - b.zIndex);

    if (ball.visible) {
      ctx.save();
      ctx.translate(ball.x, ball.y + 30);
      ctx.scale(ball.scale, ball.scale);
      ctx.drawImage(
        ballImageRef.current,
        -BALL_SIZE / 2,
        -BALL_SIZE / 2,
        BALL_SIZE,
        BALL_SIZE,
      );
      ctx.restore();
    }

    sortedCups.forEach((cup) => {
      ctx.drawImage(
        cupImageRef.current!,
        cup.x - CUP_WIDTH / 2,
        cup.y - CUP_HEIGHT / 2,
        CUP_WIDTH,
        CUP_HEIGHT,
      );
    });
  };

  const getStatusText = () => {
    switch (gameState) {
      case 'betting':
        return '포인트를 배팅해주세요!';
      case 'showing':
        return '공의 위치를 확인하세요!';
      case 'hiding':
        return '공을 숨기는 중...';
      case 'shuffling':
        return '컵을 섞는 중...';
      case 'selecting':
        return '컵을 선택해주세요!';
      case 'result':
        return result === 'correct' ? '정답입니다!' : '틀렸습니다!';
      default:
        return '';
    }
  };

  const getTimerColor = () => {
    if (timerProgress > 66) return 'bg-green-500';
    if (timerProgress > 33) return 'bg-yellow-500';
    return 'bg-red-500';
  };

  return (
    <div
      className={cn(
        'relative',
        'flex',
        'h-full',
        'w-full',
        'flex-col',
        'items-center',
        'justify-center',
        'overflow-hidden',
        'bg-gray-700',
      )}
    >
      <canvas
        ref={canvasRef}
        width={CANVAS_WIDTH}
        height={CANVAS_HEIGHT}
        className={cn('max-w-full')}
      />

      <div
        className={cn(
          'z-10',
          'mt-4',
          'space-y-16',
          'text-center',
          'w-full',
          'px-4',
        )}
      >
        {[
          'betting',
          'showing',
          'hiding',
          'shuffling',
          'selecting',
          'result',
        ].includes(gameState) && (
          <p
            className={cn('text-body1e', 'text-gray-300')}
            style={{
              animation: 'fadeInUp 0.3s ease-out',
            }}
          >
            {gameState === 'result' ? (
              <span
                className={
                  result === 'correct'
                    ? 'text-system-success'
                    : 'text-system-error'
                }
              >
                {getStatusText()}
              </span>
            ) : (
              getStatusText()
            )}
          </p>
        )}

        {gameState === 'selecting' && userSelection === null && (
          <div className="mx-auto mt-2 h-10 w-full max-w-[500px] overflow-hidden rounded-sm bg-gray-600">
            <div
              className={cn(
                'h-2.5',
                'transition-all',
                'duration-75',
                getTimerColor(),
              )}
              style={{
                width: `${timerProgress}%`,
              }}
            />
          </div>
        )}
      </div>

      {gameState === 'idle' && (
        <div
          className={cn(
            'absolute',
            'inset-0',
            'z-20',
            'flex',
            'items-center',
            'justify-center',
            'rounded-lg',
            'bg-black/30',
            'backdrop-blur-sm',
          )}
        >
          <button
            onClick={startGame}
            className={cn('pad:text-h1e', 'text-white', 'text-body1e')}
          >
            게임하기
          </button>
        </div>
      )}

      {gameState === 'round' && (
        <div
          className={cn(
            'absolute',
            'inset-0',
            'z-20',
            'flex',
            'flex-col',
            'items-center',
            'justify-center',
            'gap-8',
            'rounded-lg',
            'bg-black/30',
            'backdrop-blur-sm',
          )}
        >
          <p className={cn('pad:text-h1e', 'text-white', 'text-body2e')}>
            다음 라운드에 도전하겠습니까?
          </p>
          <div className={cn('flex', 'items-center', 'gap-24')}>
            <button
              className={cn(
                'rounded',
                'px-6',
                'py-2',
                'pad:text-body1s',
                'text-body3e',
                'text-gray-300',
                'hover:text-system-success',
              )}
              onClick={onNextRound}
            >
              YES
            </button>
            <button
              className={cn(
                'rounded',
                'px-6',
                'py-2',
                'pad:text-body1s',
                'text-body3e',
                'text-gray-300',
                'hover:text-system-error',
              )}
              onClick={onStopGame}
            >
              NO
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default YavarweeAnimation;
