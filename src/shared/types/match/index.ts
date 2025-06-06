export type Team = {
  teamId: number;
  teamName: string;
  participantCount: number;
  winCount: number;
};

export type TeamListResponse = {
  count: number;
  team: Team[];
};

interface Participant {
  studentId: number;
  name: string;
  classNumber: number;
  studentNumber: number;
  positionX: string;
  positionY: string;
}

export interface TeamDetailType extends Team {
  participant: Participant[];
}
