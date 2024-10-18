import classNames from 'classnames';
import styles from './UnderLine.module.scss';
import Icons from '../icons/Icons';

function UnderLineText({ className, ...props }) {
  const { text1, text2, icon, underlineColor } = props;

  return (
    <div className={classNames(styles.wrapper, className)}>
      <h1 className={styles.title}>
        {text1 && <span>{text1}</span>}
        <div className={styles.iconContainer}>{icon}</div>
        {text2 && <span>{text2}</span>}
      </h1>
      <Icons className={styles.underline} id="underline" fill={underlineColor || null} />
    </div>
  );
}

export default UnderLineText;
