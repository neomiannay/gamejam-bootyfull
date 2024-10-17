import { useEffect } from 'react';
import styles from './Intro.module.scss';
import classNames from 'classnames';

import { useDirectionContext } from '../../provider/DirectionProvider';
import { useGameStateContext } from '../../provider/GameStateProvider';

import { GAME_PHASES } from '../../utils/constants';

function Intro({ className, ...props }) {
  const { player1, player2 } = useDirectionContext();
  const { setCurrentPhase } = useGameStateContext();

  const handlePhaseEnd = (event) => {
    if (event.key === 'a') {
      setCurrentPhase(GAME_PHASES.GAME);
    }
  };
  useEffect(() => {
    player1.addEventListener('keydown', handlePhaseEnd);
    player2.addEventListener('keydown', handlePhaseEnd);

    return () => {
      player1.removeEventListener('keydown', handlePhaseEnd);
      player2.removeEventListener('keydown', handlePhaseEnd);
    };
  }, []);

  const handleVideoEnd = () => {
    setCurrentPhase(GAME_PHASES.GAME);
  };

  return (
    <div className={classNames(styles.wrapper, className)} {...props}>
      <video
        className={styles.video}
        src="/video/intro-compressed.mp4"
        autoPlay
        muted
        onEnded={handleVideoEnd}
        loop={false}
      />
    </div>
  );
}

export default Intro;
