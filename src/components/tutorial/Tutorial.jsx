import classNames from 'classnames';
import styles from './Tutorial.module.scss';
import { useGameStateContext } from '../../provider/GameStateProvider';
import { useDirectionContext } from '../../provider/DirectionProvider';
import { useEffect } from 'react';
import { GAME_PHASES } from '../../utils/constants';
import Icons from '../icons/Icons';
import UnderLineText from '../underline-text/UnderLine';
import Button from '../button/Button';
import { motion } from 'framer-motion';
import { baseVariants, pageTransition } from '../../core/animation';

function Tutorial({ className, ...props }) {
  const { setCurrentPhase, setTutorialActive } = useGameStateContext();
  const { player1, player2 } = useDirectionContext();

  const linkLogo = '/images/logo.svg';

  const changePhase = (event) => {
    if (event.key === 'a') setTutorialActive(false);
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
    <motion.div className={classNames(styles.wrapper, className)} {...baseVariants} {...pageTransition}>

      <div className={styles.explanations}>
        <img src="/images/chris/tete-7.png" alt="" className={styles.icon} />
        <ul className={styles.text}>
          <li>Utilise le joystick pour bouger</li>
          <li>Récupère les cotons </li>
        </ul>

        <img src="/images/missy/screen.png" alt="" className={styles.icon} />
        <ul className={styles.text}>
          <li>Utilise le joystick pour bouger le curseur de visé</li>
          <li>Appuie sur le bouton         pour lancer des ondes</li>
          <li>Reste appuyé sur        et utilise le joystick pour désorienter Chris et inverser les commandes du joueur</li>
        </ul>

        <img src="/images/progress/progress-bar.svg" alt="" className={styles.iconBar} />
        <ul className={styles.text}>
          <li>Prends le dessus sur l'autre joueur afin de gagner</li>
        </ul>
      </div>

      <Button text="Passer" className={styles.buttonSkip} />

    </motion.div>
  );
}

export default Tutorial;
