import React, { forwardRef, useState } from 'react';
import { ArrowDownIcon } from '@/shared/assets/icons';
import { cn } from '@/shared/utils/cn';

interface Option {
  value: string;
  label: string;
}

interface SelectOptionProp
  extends React.SelectHTMLAttributes<HTMLButtonElement> {
  options: Option[];
  initialLabel?: string;
}

const SelectOption = forwardRef<HTMLButtonElement, SelectOptionProp>(
  ({ options, initialLabel = '선택하세요', ...props }, ref) => {
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const [selectedOption, setSelectedOption] = useState<string>(initialLabel);

    const toggling = () => setIsOpen(!isOpen);

    const onOptionClicked = (value: string, label: string) => () => {
      setSelectedOption(label);
      setIsOpen(false);
    };

    return (
      <div className="relative w-full">
        <button
          type="button"
          className={cn(
            'flex',
            'items-center',
            'justify-between',
            'rounded-lg',
            'bg-gray-700',
            'px-16',
            'py-12',
            'h-[3.5rem]',
            'w-full',
          )}
          onClick={toggling}
          ref={ref}
          {...props}
        >
          <span className={cn('text-body3s', 'text-white')}>
            {selectedOption}
          </span>
          <ArrowDownIcon size={24} color="#fff" />
        </button>

        {isOpen && (
          <ul
            className={cn(
              'absolute',
              'left-0',
              'right-0',
              'mt-4',
              'rounded-md',
              'shadow-lg',
              'px-16',
              'py-24',
              'bg-gray-700',
              'w-full',
              'space-y-10',
              'z-10',
            )}
          >
            {options.map((option, index) => (
              <li
                key={option.value}
                className={cn(
                  'cursor-pointer',
                  'text-body3e',
                  selectedOption === option.label
                    ? 'text-white'
                    : 'text-gray-400',
                  index < options.length - 1
                    ? 'border-b-1 border-solid border-gray-600 pb-12'
                    : '',
                )}
                onClick={onOptionClicked(option.value, option.label)}
              >
                {option.label}
              </li>
            ))}
          </ul>
        )}
      </div>
    );
  },
);

SelectOption.displayName = 'SelectOption';
export default SelectOption;
