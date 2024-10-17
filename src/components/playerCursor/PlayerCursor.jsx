import classNames from 'classnames';
import styles from './PlayerCursor.module.scss';
import Icons from '../icons/Icons';

function PlayerCursor({ className, player, outline }) {
  return (
    <div className={classNames(styles.wrapper, className)}>
      <Icons id={outline} />
      <span>{player}</span>
    </div>
  );
}

export default PlayerCursor;
