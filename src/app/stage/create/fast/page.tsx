import { cn } from '@/shared/utils/cn';
import { FastCreatePage } from '@/views/stage/create/fast';

const page = () => {
  return (
    <div
      className={cn(
        'flex',
        'min-h-screen',
        'w-full',
        'items-center',
        'justify-center',
        'px-16',
        'py-[5rem]',
        'mobile:py-[2.5rem]',
      )}
    >
      <FastCreatePage />
    </div>
  );
};

export default page;
