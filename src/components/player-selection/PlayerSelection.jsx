import classNames from 'classnames';
import styles from './PlayerSelection.module.scss';
import UnderLineText from '../underline-text/UnderLineText';
import Icons from '../icons/Icons';

function PlayerSelection({ className, ...props }) {
  return (
    <div className={classNames(styles.wrapper, className)} {...props}>
      <h1 className={styles.title}>Selectionnez votre personnage</h1>

      <div className={styles.playersWrapper}>
        <div className={styles.player}>
          <div className={styles.playerImg}>
            <img src="/images/missy.png" alt="Missy" />
          </div>
          <div className={styles.playerName}>Missy</div>
        </div>

        <div className={styles.player}>
          <div className={styles.playerImg}>
            <img src="/images/chris/tete-4.svg" alt="Chris" />
          </div>
          <div className={styles.playerName}>Chris</div>
        </div>
      </div>

      <UnderLineText
        className={styles.textContainer}
        text1="Appuyer sur"
        text2="pour continuer"
        icon={<Icons id="axis_a" fill="#ae9e9c" />}
        underlineColor="#ae9e9c"
      />
    </div>
  );
}

export default PlayerSelection;
