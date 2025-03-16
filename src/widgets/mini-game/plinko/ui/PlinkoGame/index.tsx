'use client';

import Matter, { Bodies, Engine, Render, World } from 'matter-js';
import { useEffect, useRef } from 'react';
import { UseFormWatch } from 'react-hook-form';
import { BlueCircle } from '@/shared/assets/svg';
import { PlinkoFormType } from '@/shared/types/mini-game';
import { cn } from '@/shared/utils/cn';

interface PlinkoGameProps {
  watch: UseFormWatch<PlinkoFormType>;
}

const PlinkoGame = ({ watch }: PlinkoGameProps) => {
  const engineRef = useRef<Engine | null>(null);
  const renderRef = useRef<Render | null>(null);
  const fallingBallRef = useRef<Matter.Body | null>(null);

  useEffect(() => {
    const engine = Engine.create();
    const world = engine.world;

    engineRef.current = engine;

    const render = Render.create({
      element: document.getElementById('plinko-container')!,
      engine,
      options: {
        wireframes: false,
      },
    });

    renderRef.current = render;

    const ball = Bodies.circle(400, 0, 20, {
      restitution: 0.8,
      render: {
        fillStyle: 'red',
      },
    });

    World.add(world, ball);

    Engine.run(engine);
    Render.run(render);

    fallingBallRef.current = ball;

    return () => {
      Engine.clear(engine);
      Render.stop(render);
    };
  }, []);

  const risk = watch('risk');

  const getButtonValues = () => {
    if (risk === 'MEDIUM') {
      return [110, 41, 10, 5, 3, 1.5, 1, 0.5, 0.3, 1, 1.5, 3, 5, 10, 41, 110];
    }
    if (risk === 'HIGH') {
      return [1000, 130, 26, 9, 4, 2, 0.2, 0.2, 0.2, 2, 2, 4, 9, 26, 130, 1000];
    }
    return [16, 9, 2, 1.4, 1.4, 1.2, 1.1, 1, 0.5, 1, 1.1, 1.2, 1.4, 2, 9, 16];
  };

  const buttonValues = getButtonValues();

  const circleCount = Math.min(buttonValues.length + 2, 15);

  return (
    <div
      className={cn(
        'flex',
        'w-full',
        'px-[1.5rem]',
        'py-[2rem]',
        'flex-col',
        'rounded-xl',
        'bg-gray-700',
        'max-w-[55.75rem]',
      )}
    >
      <div
        className={cn('flex', 'flex-col', 'justify-center', 'gap-[2.25rem]')}
      >
        <div
          className={cn(
            'flex',
            'max-w-full',
            'flex-col',
            'items-center',
            'gap-[1.5rem]',
            'justify-center',
          )}
        >
          {Array.from({ length: circleCount }).map((_, index) => (
            <div
              key={index}
              className={cn(
                'flex',
                'items-center',
                'gap-[2.5rem]',
                'w-full',
                'justify-center',
              )}
            >
              {Array.from({ length: Math.min(index + 3, 17) }).map(
                (_, circleIndex) => (
                  <BlueCircle key={circleIndex} />
                ),
              )}
            </div>
          ))}
        </div>
        <div
          className={cn(
            'flex',
            'items-center',
            'justify-around',
            'gap-[0.5rem]',
          )}
        >
          {buttonValues.map((value, index) => (
            <div
              key={index}
              className={cn(
                'flex',
                'w-full',
                'px-[0.5rem]',
                'py-[0.25rem]',
                'justify-center',
                'items-center',
                'rounded-lg',
                'bg-main-100',
              )}
            >
              <p className={cn('text-caption3s', 'text-main-600')}>{value}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PlinkoGame;
