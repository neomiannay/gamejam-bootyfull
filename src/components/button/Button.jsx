import classNames from 'classnames';
import styles from './Button.module.scss';
import Icons from '../icons/Icons';

function Button({ className, ...props }) {
  const { text } = props;

  return (
    <div className={classNames(styles.wrapper, className)}>
      <p>{text}</p>
    </div>
  );
}

export default Button;
