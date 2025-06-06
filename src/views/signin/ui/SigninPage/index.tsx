import { cn } from '@/shared/utils/cn';
import { SigninContainer } from '@/widgets/signin';

const SigninPage = () => {
  return (
    <div
      className={cn(
        'flex',
        'min-h-screen',
        'w-full',
        'items-center',
        'justify-center',
        'px-16',
      )}
    >
      <SigninContainer />
    </div>
  );
};

export default SigninPage;
