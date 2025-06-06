import React from 'react';
import {
  AdminIcon,
  ClockIcon,
  ConfirmedIcon,
  FinalIcon,
  OfficialIcon,
  StreamingIcon,
  TeamCountIcon,
} from '@/shared/assets/svg';

export type MatchType =
  | 'OFFICIAL'
  | 'FAST'
  | 'ADMIN'
  | 'STREAMING'
  | 'CONFIRMED'
  | 'RECRUITING'
  | 'TIME'
  | 'FINAL'
  | 'TEAM';

export const MATCH_TYPES: Record<
  string,
  { icon: (color?: string) => JSX.Element; text?: string }
> = {
  OFFICIAL: { icon: () => <OfficialIcon />, text: '공식' },
  FAST: { icon: () => <OfficialIcon />, text: '사설' },
  ADMIN: {
    icon: () => <AdminIcon />,
    text: '관리자',
  },
  STREAMING: { icon: () => <StreamingIcon />, text: '중계 설정' },
  CONFIRMED: {
    icon: (color) => <ConfirmedIcon color={color} />,
    text: '모집 확정',
  },
  RECRUITING: {
    icon: (color) => <ConfirmedIcon color={color} />,
    text: '모집중',
  },
  TIME: { icon: (color) => <ClockIcon color={color} />, text: '기타' },
  FINAL: { icon: () => <FinalIcon /> },
  TEAM: { icon: (color) => <TeamCountIcon color={color} /> },
};
