import React from 'react';

interface MatchItemProps {
  index: number;
  teamAName: string;
  teamBName: string;
  teamAId: number;
  teamBId: number;
  selected: boolean;
  solved: boolean;
  onClick?: () => void;
}

const MatchItem = ({
  index,
  teamAName,
  teamBName,
  selected = false,
  solved = false,
  onClick,
}: MatchItemProps) => {
  return (
    <div
      className={`flex min-h-20 w-[300px] items-center rounded-lg ${solved ? 'bg-gray-600' : 'bg-main-600'} ${selected ? 'outline-3 outline outline-main-600' : ''} cursor-pointer p-[8px_16px] text-white`}
      onClick={onClick}
    >
      <div className="mr-[20px] text-h4s font-bold">{index}</div>
      <div className="flex flex-1 items-center justify-center">
        <div className="text-16 font-medium">{teamAName}</div>
        <div className="text-12 mx-[10px] opacity-70">vs</div>
        <div className="text-16 font-medium">{teamBName}</div>
      </div>
    </div>
  );
};

export default MatchItem;
