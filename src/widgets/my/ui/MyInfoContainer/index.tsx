'use client';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { SettingIcon } from '@/shared/assets/svg';
import { UserInfoType } from '@/shared/types/my';
import { cn } from '@/shared/utils/cn';

interface MyInfoContainerProps {
  myInfo?: UserInfoType;
  isPending: boolean;
}

const MyInfoContainer = ({ myInfo, isPending }: MyInfoContainerProps) => {
  const [iconClicked, setIconClicked] = useState<boolean>(false);
  const { name, schoolName, sex } = myInfo || {};
  const { push } = useRouter();

  const setToKorean = sex === 'MALE' ? '남성' : '여성';

  const infoList = [
    { label: '이름', value: name },
    { label: '학교', value: schoolName },
    { label: '성별', value: setToKorean },
  ];

  const menuItems = [
    {
      label: '정보 수정',
      action: () => push('/my/edit'),
      hoverClass: 'hover:text-white',
    },
    {
      label: '회원 탈퇴',
      action: () => push('/delete'),
      hoverClass: 'hover:text-system-error',
    },
    {
      label: '취소',
      action: () => setIconClicked(false),
      hoverClass: 'hover:text-white',
    },
  ];

  return (
    <div
      className={cn(
        'relative',
        'flex',
        'w-full',
        'items-center',
        'justify-between',
        'rounded-xl',
        'bg-gray-700',
        'px-[1.625rem]',
        'py-[2rem]',
        'tablet:py-[1.5rem]',
      )}
    >
      <div className={cn('flex items-center gap-[2.25rem]')}>
        {isPending ? (
          <div
            className={cn('text-body1s', 'tablet:text-body2s', 'text-white')}
          >
            내 정보를 불러오는 중...
          </div>
        ) : (
          infoList.map((info) => (
            <div
              key={info.label}
              className={cn('flex items-center gap-[1rem]')}
            >
              <p
                className={cn(
                  'text-body2s',
                  'tablet:text-body3s',
                  'text-gray-500',
                )}
              >
                {info.label}
              </p>
              <p
                className={cn(
                  'text-body1s',
                  'tablet:text-body3s',
                  'text-white',
                )}
              >
                {info.value}
              </p>
            </div>
          ))
        )}
      </div>

      <div className={cn('flex items-center gap-[1.5rem]')}>
        <button
          onClick={() => setIconClicked(!iconClicked)}
          className={cn('flex items-center gap-[0.5rem]')}
        >
          <div
            className={cn(
              'flex h-[1.5rem] w-[1.5rem] items-center justify-center',
            )}
          >
            <SettingIcon color={iconClicked ? '#fff' : '#6B6B6B'} />
          </div>
          <p
            className={cn(
              'text-body1s',
              'tablet:text-body2s',
              iconClicked ? 'text-white' : 'text-gray-500',
            )}
          >
            설정
          </p>
        </button>

        {iconClicked && (
          <div
            className={cn(
              'absolute',
              'right-0',
              'top-0',
              'translate-y-[35%]',
              'items-center',
              'rounded-xl',
              'bg-gray-700',
              'px-[2.25rem]',
              'tablet:px-[1.5rem]',
              'py-[2.5rem]',
              'shadow-[0px_0px_18px_0px_rgba(0,0,0,0.25)]',
            )}
          >
            <div
              className={cn(
                'flex',
                'flex-col',
                'items-center',
                'justify-center',
                'gap-[4.1875rem]',
                'tablet:gap-[3rem]',
              )}
            >
              {menuItems.map((item) => (
                <button
                  key={item.label}
                  onClick={item.action}
                  className={cn(
                    'text-body2s',
                    'tablet:text-bod3s',
                    'text-gray-400',
                    item.hoverClass,
                  )}
                >
                  {item.label}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default MyInfoContainer;
