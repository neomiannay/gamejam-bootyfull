import classNames from 'classnames';
import styles from './Menu.module.scss';
import { useGameStateContext } from '../../provider/GameStateProvider';
import { useDirectionContext } from '../../provider/DirectionProvider';
import { useEffect } from 'react';
import { GAME_PHASES } from '../../utils/constants';
import Icons from '../icons/Icons';
import UnderLineText from '../underline-text/UnderLineText';

function Menu({ className, ...props }) {
  const { setCurrentPhase } = useGameStateContext();
  const { player1, player2 } = useDirectionContext();

  const linkLogo = '/images/logo.svg';

  const changePhase = (event) => {
    if (event.key === 'a') setCurrentPhase(GAME_PHASES.PLAYER_SELECT);
  };

  useEffect(() => {
    player1.addEventListener('keydown', changePhase);
    player2.addEventListener('keydown', changePhase);

    return () => {
      player1.removeEventListener('keydown', changePhase);
      player2.removeEventListener('keydown', changePhase);
    };
  }, []);

  return (
    <div className={classNames(styles.wrapper, className)}>
      <img className={styles.img} src={linkLogo} alt="logo" />

      <UnderLineText
        className={styles.textContainer}
        text1="Appuyer sur"
        text2="pour continuer"
        icon={<Icons id="axis_a" />}
        underlineColor="#ffffff"
      />
    </div>
  );
}

export default Menu;
