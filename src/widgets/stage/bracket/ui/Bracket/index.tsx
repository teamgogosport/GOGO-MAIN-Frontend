'use client';

import { DragDropContext, Droppable, DropResult } from '@hello-pangea/dnd';
import { useSearchParams } from 'next/navigation';
import { useEffect, useState, useRef } from 'react';
import { toast } from 'react-toastify';
import TeamItem from '@/entities/stage/bracket/ui/TeamItem';
import calculateTeamDistribution from '@/shared/model/calculateTeamDistribution';
import { GroupDistribution } from '@/shared/model/calculateTeamDistribution';
import BracketConnectionLayer from '@/shared/ui/BracketConnectionLayer';
import { cn } from '@/shared/utils/cn';
import {
  BracketHeader,
  handleRemoveTeam,
} from '@/widgets/stage/bracket/ui/BracketHeader';
import TeamArray from '@/widgets/stage/bracket/ui/TeamArray';

interface TeamData {
  teamId: number;
  teamName: string;
}

interface BracketNode {
  round: number;
  position: number;
  teamName: string;
  teamId?: number;
  left: BracketNode | null;
  right: BracketNode | null;
  isEmpty: boolean;
}

const Bracket = () => {
  const searchParams = useSearchParams();
  const gameId = Number(searchParams.get('gameId')) || 0;

  const [totalTeams, setTotalTeams] = useState(4);
  const [finalStage, setFinalStage] = useState(4);
  const [bracketTree, setBracketTree] = useState<BracketNode | null>(null);
  const [firstRoundDistribution, setFirstRoundDistribution] = useState<
    [GroupDistribution, GroupDistribution]
  >([
    { top: 1, bottom: 1 },
    { top: 1, bottom: 1 },
  ]);
  const [deleteMode, setDeleteMode] = useState(false);

  const [teams, setTeams] = useState<TeamData[]>([]);
  const [placedTeams, setPlacedTeams] = useState<{ [key: number]: boolean }>(
    {},
  );

  const [isDragging, setIsDragging] = useState(false);
  const [savedTeamPlacements, setSavedTeamPlacements] = useState<
    Record<string, TeamData>
  >({});
  const [isClient, setIsClient] = useState(false);

  const portalRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    setIsClient(true);

    try {
      const placedTeamsData = sessionStorage.getItem(`placedTeams_${gameId}`);
      if (placedTeamsData) {
        setSavedTeamPlacements(JSON.parse(placedTeamsData));
      }
    } catch (error) {
      console.error(error);
    }

    const handleBracketStorage = (event: CustomEvent) => {
      if (event.detail?.gameId === gameId) {
        try {
          const updatedData = sessionStorage.getItem(`placedTeams_${gameId}`);
          if (updatedData) {
            setSavedTeamPlacements(JSON.parse(updatedData));
          }
        } catch (error) {
          console.error(error);
        }
      }
    };

    window.addEventListener(
      'bracketStorage',
      handleBracketStorage as EventListener,
    );

    const portalContainer = document.createElement('div');
    portalContainer.style.position = 'fixed';
    portalContainer.style.zIndex = '9999';
    portalContainer.style.top = '0';
    portalContainer.style.left = '0';
    portalContainer.style.width = '100%';
    portalContainer.style.height = '100%';
    portalContainer.style.pointerEvents = 'none';
    portalRef.current = portalContainer;
    document.body.appendChild(portalContainer);

    return () => {
      window.removeEventListener(
        'bracketStorage',
        handleBracketStorage as EventListener,
      );
      if (portalRef.current && document.body.contains(portalRef.current)) {
        document.body.removeChild(portalRef.current);
      }
    };
  }, [gameId]);

  const availableTeams = teams.filter((team) => !placedTeams[team.teamId]);

  const createBracketTree = (teamCount: number): BracketNode | null => {
    if (teamCount < 2) return null;

    const rounds = teamCount <= 4 ? 2 : 3;
    const totalPositions = Math.pow(2, rounds);

    const nodes: BracketNode[][] = Array(rounds)
      .fill(null)
      .map(() => []);

    for (let i = 0; i < totalPositions / 2; i++) {
      nodes[0].push({
        round: 1,
        position: i,
        teamName: '',
        left: null,
        right: null,
        isEmpty: true,
      });
    }

    for (let round = 1; round < rounds; round++) {
      const prevRoundNodes = nodes[round - 1];
      for (let i = 0; i < prevRoundNodes.length; i += 2) {
        const node: BracketNode = {
          round: round + 1,
          position: Math.floor(i / 2),
          teamName: '',
          left: prevRoundNodes[i],
          right: prevRoundNodes[i + 1] || null,
          isEmpty: true,
        };
        nodes[round].push(node);
      }
    }

    return nodes[rounds - 1][0];
  };

  const createBracket = (teamCount: number): void => {
    if (teamCount < 2) return;
    setFinalStage(teamCount <= 4 ? 4 : 8);
    setFirstRoundDistribution(calculateTeamDistribution(teamCount));
    setBracketTree(createBracketTree(teamCount));
  };

  useEffect(() => {
    const confirmedTeams = sessionStorage.getItem(`confirmedTeams_${gameId}`);
    const oldConfirmedTeams = sessionStorage.getItem('confirmedTeams');

    if (confirmedTeams) {
      try {
        const parsedTeams = JSON.parse(confirmedTeams);
        setTeams(parsedTeams);
        setTotalTeams(Math.max(2, parsedTeams.length));
      } catch (error) {
        console.error(error);
      }
    } else if (oldConfirmedTeams && gameId === 0) {
      try {
        const parsedTeams = JSON.parse(oldConfirmedTeams);
        setTeams(parsedTeams);
        setTotalTeams(Math.max(2, parsedTeams.length));

        sessionStorage.setItem(`confirmedTeams_${gameId}`, oldConfirmedTeams);
      } catch (error) {
        console.error(error);
      }
    } else {
      setTeams(
        Array.from({ length: 10 }, (_, i) => ({
          teamId: i + 1,
          teamName: `Team ${i + 1}`,
        })),
      );
      setTotalTeams(10);
    }

    try {
      const placedTeamsData = sessionStorage.getItem(`placedTeams_${gameId}`);
      if (placedTeamsData) {
        const placedTeamsRecord = JSON.parse(placedTeamsData);
        const placedTeamsMap: { [key: number]: boolean } = {};
        for (const key in placedTeamsRecord) {
          if (Object.prototype.hasOwnProperty.call(placedTeamsRecord, key)) {
            placedTeamsMap[placedTeamsRecord[key].teamId] = true;
          }
        }
        setPlacedTeams(placedTeamsMap);
      }
    } catch (error) {
      console.error(error);
    }
  }, [gameId]);

  useEffect(() => {
    createBracket(totalTeams);
  }, [totalTeams]);

  useEffect(() => {
    const handleTeamPlacement = (event: Event) => {
      try {
        const customEvent = event as CustomEvent;
        if (customEvent.detail && customEvent.detail.gameId !== gameId) {
          return;
        }

        const placedTeamsData = sessionStorage.getItem(`placedTeams_${gameId}`);
        if (placedTeamsData) {
          const placedTeamsRecord = JSON.parse(placedTeamsData);
          const newPlacedTeams: { [key: number]: boolean } = {};
          for (const key in placedTeamsRecord) {
            if (Object.prototype.hasOwnProperty.call(placedTeamsRecord, key)) {
              newPlacedTeams[placedTeamsRecord[key].teamId] = true;
            }
          }
          setPlacedTeams(newPlacedTeams);
        }
      } catch (error) {
        console.error(error);
      }
    };

    window.addEventListener('storage', handleTeamPlacement);
    window.addEventListener('bracketStorage', handleTeamPlacement);

    try {
      const placedTeamsData = sessionStorage.getItem(`placedTeams_${gameId}`);
      if (placedTeamsData) {
        const placedTeamsRecord = JSON.parse(placedTeamsData);
        const newPlacedTeams: { [key: number]: boolean } = {};
        for (const key in placedTeamsRecord) {
          if (Object.prototype.hasOwnProperty.call(placedTeamsRecord, key)) {
            newPlacedTeams[placedTeamsRecord[key].teamId] = true;
          }
        }
        setPlacedTeams(newPlacedTeams);
      }
    } catch (error) {
      console.error(error);
    }

    return () => {
      window.removeEventListener('storage', handleTeamPlacement);
      window.removeEventListener('bracketStorage', handleTeamPlacement);
    };
  }, [gameId]);

  useEffect(() => {
    try {
      const savedBracketState = sessionStorage.getItem(
        `bracketState_${gameId}`,
      );
      if (savedBracketState) {
        const parsedState = JSON.parse(savedBracketState);
        setBracketTree(parsedState);
      }
    } catch (error) {
      console.error(error);
      toast.error('대진표 상태 오류 발생');
    }
  }, [gameId]);

  const getNodesAtRound = (
    root: BracketNode | null,
    targetRound: number,
  ): BracketNode[] => {
    if (!root) return [];

    if (targetRound === 1) {
      return Array(4)
        .fill(null)
        .map((_, idx) => ({
          round: 1,
          position: idx,
          teamName: '',
          left: null,
          right: null,
          isEmpty: true,
        }));
    }

    const result: BracketNode[] = [];
    const queue = [root];

    while (queue.length > 0) {
      const current = queue.shift()!;
      if (current.round === targetRound) {
        result.push(current);
      } else if (current.round < targetRound) {
        if (current.left) queue.push(current.left);
        if (current.right) queue.push(current.right);
      }
    }

    return result.sort((a, b) => a.position - b.position);
  };

  const renderFirstRoundGroup = (
    teamCount: number,
    nodes: BracketNode[],
    round: number,
    side: 'left' | 'right',
  ) => {
    const placedTeams: Record<string, TeamData> = isClient
      ? savedTeamPlacements
      : {};

    return (
      <div
        className={cn(
          'flex-1',
          'flex',
          'flex-col',
          'justify-around',
          'items-center',
        )}
      >
        {Array(teamCount)
          .fill(null)
          .map((_, _idx) => {
            const defaultNode = {
              round: 1,
              position: _idx,
              teamName: '',
              left: null,
              right: null,
              isEmpty: true,
            };
            const node = nodes[_idx] || defaultNode;
            const droppableId = `round_${round}_position_${node.position}_side_${side}`;

            const positionKey = `${round}_${node.position}_${side}`;
            const placedTeam = placedTeams[positionKey] || {
              teamId: 0,
              teamName: '',
            };
            const hasTeam = !!placedTeam.teamName;

            return (
              <div key={droppableId} className="relative">
                {!hasTeam && (
                  <TeamItem
                    teamName=""
                    isEmpty={true}
                    className={cn(
                      'w-[160px]',
                      'absolute',
                      'top-0',
                      'left-0',
                      'z-0',
                      'team-item-empty',
                    )}
                  />
                )}
                <Droppable key={droppableId} droppableId={droppableId}>
                  {(provided, snapshot) => (
                    <div
                      ref={provided.innerRef}
                      {...provided.droppableProps}
                      className={cn(
                        'w-[160px]',
                        'h-[48px]',
                        'relative',
                        'rounded-lg',
                        'transition-all',
                        'duration-200',
                        'z-10',
                        snapshot.isDraggingOver && !hasTeam
                          ? 'border-2 border-blue-400 bg-blue-500/40'
                          : 'bg-transparent',
                        snapshot.isDraggingOver && hasTeam && 'bg-red-500/20',
                      )}
                      style={{ transform: 'none' }}
                    >
                      {hasTeam && (
                        <TeamItem
                          teamName={placedTeam.teamName}
                          isEmpty={false}
                          className="w-[160px]"
                          deleteMode={deleteMode}
                          onDelete={() =>
                            handleRemoveTeam(
                              round,
                              node.position,
                              side,
                              gameId,
                              savedTeamPlacements,
                              setSavedTeamPlacements,
                              bracketTree,
                              setBracketTree,
                            )
                          }
                        />
                      )}
                      {provided.placeholder}
                    </div>
                  )}
                </Droppable>
              </div>
            );
          })}
      </div>
    );
  };

  const isLeafNode = (round: number): boolean => {
    return round === 1;
  };

  const renderBracketColumn = (
    round: number,
    position: number,
    isFirstRound: boolean = false,
    distribution?: GroupDistribution,
    side: 'left' | 'right' = 'left',
  ) => {
    const nodesInRound = getNodesAtRound(bracketTree, round);

    if (isFirstRound && distribution) {
      const topNodes = nodesInRound.slice(0, distribution.top);
      const bottomNodes = nodesInRound.slice(
        distribution.top,
        distribution.top + distribution.bottom,
      );

      return (
        <div
          className={cn(
            'flex',
            'flex-col',
            'h-full',
            'items-center',
            'w-[180px]',
            'gap-4',
          )}
        >
          {renderFirstRoundGroup(distribution.top, topNodes, round, side)}
          {renderFirstRoundGroup(distribution.bottom, bottomNodes, round, side)}
        </div>
      );
    }

    const placedTeams: Record<string, TeamData> = isClient
      ? savedTeamPlacements
      : {};

    return (
      <div
        className={cn(
          'flex',
          'flex-col',
          'justify-around',
          'h-full',
          'items-center',
          'w-[180px]',
          round === 2 && 'w-[200px]',
        )}
      >
        {Array(position)
          .fill(null)
          .map((_, _idx) => {
            const defaultNode = {
              round,
              position: _idx,
              teamName: '',
              left: null,
              right: null,
              isEmpty: true,
            };
            const node = nodesInRound[_idx] || defaultNode;
            const droppableId = `round_${round}_position_${node.position}_side_${side}`;
            const isLeaf = isLeafNode(round);

            const positionKey = `${round}_${node.position}_${side}`;
            const placedTeam = placedTeams[positionKey] || {
              teamId: 0,
              teamName: '',
            };
            const hasTeam = isLeaf ? !!placedTeam.teamName : false;

            return (
              <div key={droppableId} className="relative">
                {isLeaf ? (
                  <>
                    {!hasTeam && (
                      <TeamItem
                        teamName=""
                        isEmpty={true}
                        className={cn(
                          'w-[160px]',
                          'absolute',
                          'top-0',
                          'left-0',
                          'z-0',
                          'team-item-empty',
                        )}
                      />
                    )}
                    <Droppable key={droppableId} droppableId={droppableId}>
                      {(provided, snapshot) => (
                        <div
                          ref={provided.innerRef}
                          {...provided.droppableProps}
                          className={cn(
                            'w-[160px]',
                            'h-[48px]',
                            'relative',
                            'rounded-lg',
                            'transition-all',
                            'duration-200',
                            'z-10',
                            snapshot.isDraggingOver && !hasTeam
                              ? 'border-2 border-blue-400 bg-blue-500/40'
                              : 'bg-transparent',
                            snapshot.isDraggingOver &&
                              hasTeam &&
                              'bg-red-500/20',
                          )}
                          style={{ transform: 'none' }}
                        >
                          {hasTeam && (
                            <TeamItem
                              teamName={placedTeam.teamName}
                              isEmpty={false}
                              className="w-[160px]"
                              deleteMode={deleteMode}
                              onDelete={() =>
                                handleRemoveTeam(
                                  round,
                                  node.position,
                                  side,
                                  gameId,
                                  savedTeamPlacements,
                                  setSavedTeamPlacements,
                                  bracketTree,
                                  setBracketTree,
                                )
                              }
                            />
                          )}
                          {provided.placeholder}
                        </div>
                      )}
                    </Droppable>
                  </>
                ) : (
                  <TeamItem teamName="TBD" className="w-[160px]" />
                )}
              </div>
            );
          })}
      </div>
    );
  };

  const handleTeamDrop = (
    team: TeamData,
    round: number,
    position: number,
    side: 'left' | 'right',
  ) => {
    try {
      const placedTeams: Record<string, TeamData> = { ...savedTeamPlacements };
      const positionKey = `${round}_${position}_${side}`;
      placedTeams[positionKey] = team;
      sessionStorage.setItem(
        `placedTeams_${gameId}`,
        JSON.stringify(placedTeams),
      );
      setSavedTeamPlacements(placedTeams);

      if (!bracketTree) {
        const newRoot = createBracketTree(totalTeams);
        if (newRoot) {
          setBracketTree(newRoot);
        }
      } else {
        const cloneTree = (node: BracketNode): BracketNode => {
          return {
            ...node,
            left: node.left ? cloneTree(node.left) : null,
            right: node.right ? cloneTree(node.right) : null,
          };
        };

        const updatedTree = cloneTree(bracketTree);
        setBracketTree(updatedTree);
      }

      const confirmedTeamsData = sessionStorage.getItem(
        `confirmedTeams_${gameId}`,
      );
      if (confirmedTeamsData) {
        const allTeams = JSON.parse(confirmedTeamsData) as TeamData[];

        if (allTeams.length === 3) {
          const placedTeamsData = sessionStorage.getItem(
            `placedTeams_${gameId}`,
          );
          if (placedTeamsData) {
            const placedTeamsObj = JSON.parse(placedTeamsData);
            const byeTeam = placedTeamsObj['1_0_right'];
            if (byeTeam) {
              sessionStorage.setItem(
                `threeTeamBye_${gameId}`,
                JSON.stringify(byeTeam),
              );
            }
          }
        }
      }

      try {
        const customEvent = new CustomEvent('bracketStorage', {
          detail: { gameId },
        });
        window.dispatchEvent(customEvent);

        setTimeout(() => {
          window.dispatchEvent(
            new CustomEvent('bracketStorage', {
              detail: { gameId },
            }),
          );
        }, 100);
      } catch (error) {
        console.error(error);
        toast.error('스토리지 이벤트 오류 발생');
      }
    } catch (error) {
      toast.error('팀 배치 중 오류 발생');
      console.error(error);
    }
  };

  const handleDragEnd = (result: DropResult) => {
    setIsDragging(false);
    document.body.classList.remove('dnd-dragging');

    if (!result.destination) {
      return;
    }

    if (
      result.source.droppableId === 'teams' &&
      result.destination.droppableId.startsWith('round_')
    ) {
      const parts = result.destination.droppableId.split('_');
      const roundNum = parseInt(parts[1]);
      const positionNum = parseInt(parts[3]);
      const side = parts[5] as 'left' | 'right';

      const team = teams.find(
        (t) => t.teamId.toString() === result.draggableId,
      );
      if (team) {
        handleTeamDrop(team, roundNum, positionNum, side);

        try {
          const customEvent = new CustomEvent('bracketStorage', {
            detail: { gameId },
          });
          window.dispatchEvent(customEvent);
        } catch (error) {
          console.error(error);
        }
      }
    }
  };

  const handleDragStart = () => {
    setIsDragging(true);
    document.body.classList.add('dnd-dragging');
  };

  return (
    <DragDropContext
      onDragEnd={handleDragEnd}
      onDragStart={handleDragStart}
      enableDefaultSensors={true}
    >
      <div
        className={cn(
          'min-h-[700px]',
          'p-30',
          'flex',
          'flex-col',
          isDragging && 'drag-active',

          'justify-center',
        )}
        style={{
          transform: 'translateZ(0)',
          WebkitTransform: 'translateZ(0)',
        }}
      >
        <BracketHeader
          finalStage={finalStage}
          deleteMode={deleteMode}
          setDeleteMode={setDeleteMode}
          gameId={gameId}
          savedTeamPlacements={savedTeamPlacements}
          setSavedTeamPlacements={setSavedTeamPlacements}
          bracketTree={bracketTree}
          setBracketTree={setBracketTree}
          firstRoundDistribution={firstRoundDistribution}
        />
        <div
          className={cn(
            'flex-1',
            'bg-gray-700',
            'rounded-lg',
            'relative',
            'bracket-container',
            'w-full',
            finalStage === 4 ? 'four-bracket' : 'eight-bracket',
          )}
          style={
            {
              '--bracket-left-teams':
                firstRoundDistribution[0].top +
                firstRoundDistribution[0].bottom,
              '--bracket-right-teams':
                firstRoundDistribution[1].top +
                firstRoundDistribution[1].bottom,
            } as React.CSSProperties
          }
        >
          <div
            className={cn(
              'overflow-x-auto',
              'scroll-hidden',
              'w-full',
              'h-full',
              'flex',
            )}
          >
            <div className={cn('p-20', 'min-w-full')}>
              <div
                className="relative h-full"
                style={{
                  minWidth: finalStage === 4 ? '800px' : '1100px',
                  width: 'max-content',
                  margin: '0 auto',
                }}
              >
                <BracketConnectionLayer
                  finalStage={finalStage}
                  firstRoundDistribution={firstRoundDistribution}
                  teamCount={totalTeams}
                />

                {finalStage === 4 ? (
                  <div
                    className={cn(
                      'flex',
                      'justify-between',
                      'h-full',
                      'gap-4',
                      'relative',
                      'z-10',
                    )}
                    style={{
                      width: finalStage === 4 ? '900px' : '1200px',
                    }}
                  >
                    {renderBracketColumn(
                      1,
                      firstRoundDistribution[0].top +
                        firstRoundDistribution[0].bottom,
                      false,
                      undefined,
                      'left',
                    )}
                    {renderBracketColumn(2, 1, false, undefined, 'left')}
                    {renderBracketColumn(2, 1, false, undefined, 'right')}
                    {renderBracketColumn(
                      1,
                      firstRoundDistribution[1].top +
                        firstRoundDistribution[1].bottom,
                      false,
                      undefined,
                      'right',
                    )}
                  </div>
                ) : (
                  <div
                    className={cn(
                      'flex',
                      'justify-between',
                      'w-full',
                      'h-full',
                      'gap-4',
                      'relative',
                      'z-10',
                    )}
                  >
                    {renderBracketColumn(
                      1,
                      0,
                      true,
                      firstRoundDistribution[0],
                      'left',
                    )}
                    {renderBracketColumn(
                      2,
                      Math.ceil(
                        (firstRoundDistribution[0].top +
                          firstRoundDistribution[0].bottom) /
                          2,
                      ),
                      false,
                      undefined,
                      'left',
                    )}
                    {renderBracketColumn(3, 1, false, undefined, 'left')}
                    {renderBracketColumn(3, 1, false, undefined, 'right')}
                    {renderBracketColumn(
                      2,
                      Math.ceil(
                        (firstRoundDistribution[1].top +
                          firstRoundDistribution[1].bottom) /
                          2,
                      ),
                      false,
                      undefined,
                      'right',
                    )}
                    {renderBracketColumn(
                      1,
                      0,
                      true,
                      firstRoundDistribution[1],
                      'right',
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        <TeamArray
          availableTeams={availableTeams}
          isDragging={isDragging}
          portalRef={portalRef}
        />
      </div>
    </DragDropContext>
  );
};

export default Bracket;
