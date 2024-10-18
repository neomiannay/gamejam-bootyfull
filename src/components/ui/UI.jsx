import React, { useMemo } from 'react';

import styles from './UI.module.scss';
import classNames from 'classnames';
import Menu from '../menu/Menu';
import { useGameStateContext } from '../../provider/GameStateProvider';
import { GAME_PHASES } from '../../utils/constants';
import PlayerSelection from '../player-selection/PlayerSelection';
import Intro from '../intro/Intro';
import { AnimatePresence } from 'framer-motion';
import ProgressBar from '../progress/Progress';

function UI({ className, ...props }) {
  const { currentPhase } = useGameStateContext();

  const linkBorder = useMemo(() => {
    if (currentPhase === GAME_PHASES.GAME) {
      return '/images/border-game.svg';
    } else {
      return '/images/border.svg';
    }
  }, [currentPhase]);

  return (
    <div
      className={classNames(styles.wrapper, className, {
        [styles.backgroud]: currentPhase !== GAME_PHASES.GAME,
      })}
    >
      <img className={styles.border} src={linkBorder} />
      <AnimatePresence>
        {currentPhase === GAME_PHASES.MENU && <Menu />}
        {currentPhase === GAME_PHASES.PLAYER_SELECT && <PlayerSelection />}
        {currentPhase === GAME_PHASES.INTRO && <Intro />}
        {currentPhase === GAME_PHASES.GAME && <ProgressBar />}
      </AnimatePresence>
    </div>
  );
}

export default React.memo(UI);
