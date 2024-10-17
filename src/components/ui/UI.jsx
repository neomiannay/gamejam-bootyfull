import React from 'react';

import styles from './UI.module.scss';
import classNames from 'classnames';
import Menu from '../menu/Menu';
import { useGameStateContext } from '../../provider/GameStateProvider';
import { GAME_PHASES } from '../../utils/constants';
import PlayerSelection from '../player-selection/PlayerSelection';

function UI({ className, ...props }) {
  const { currentPhase } = useGameStateContext();

  const linkBorder = '/images/border.svg';

  return (
    <div className={classNames(styles.wrapper, className)}>
      <img className={styles.border} src={linkBorder} />
      {/* {currentPhase === GAME_PHASES.MENU && <Menu />} */}
      {currentPhase === GAME_PHASES.MENU && <PlayerSelection />}
    </div>
  );
}

export default React.memo(UI);
