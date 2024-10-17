import classNames from 'classnames';

import styles from './Icons.module.scss';

const BorderBasic = ({ fill = '#ffffff', ...props }) => {
  return (
    <svg width="1920" height="1080" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
      <path
        d="M313 30c116 4 265 2 393 3 213 0 429-2 643-6 104 0 427 6 541 8a23484 23484 0 0 1 0 134l-3 6v6l2 4 1 4c1 6 0 12-1 17a55 55 0 0 0 0 19l2 19-2 18-3 19 1 19 5 24v234l-3 28v28c0 8 1 16 3 23v36l-2 5c-2 5-1 9-1 13l2 29c1 8-1 17-1 25a90375 90375 0 0 1-1 306h-39l-36-4-12-2h-5l-6 1-24 3c-16 0-31-2-47-3a335 335 0 0 0-73 1c-170-3-355-7-514-6-11 1-34 0-44 2-10 1-20 5-30 5h-6l-5-1-2-1-3 1-8 1c-3-1-6-2-9-1-4 0-7 0-10 2l-59 1-416 2h-8l-507-23 1-161 2-3c1-3 2-5 1-8l-2-4c2-1 3-3 3-5 1-4-1-8-2-11l-2-12 1-11v-1l2-12 4-12c1-8-2-16-4-23l-2-16v-11l4-23 2-25-3-24-2-15 1-147a155 155 0 0 0 0-27l1-166 2-22 2-33 1-34-4-28-1-50 8-108 274-7ZM22 154v12c-5 277-4 595-6 873h6a13619 13619 0 0 0 9 0c20 5 40 7 61 7l62-1h14l45 2 9 2 6 1c2 1 4 0 5-1l2-1 3 1 6 1 6 1c2 0 3-1 3-3l100 4 10 2 21 3 20 3a250 250 0 0 0 87-2l28 1 22 1h65c213-3 431-5 643-5l643 12h11v-11c3-295-5-732-4-1031l-501-12-692 6-397 3-286 1-1 131Z"
        fill={fill}
      />
    </svg>
  );
};

const AxisA = ({ fill = '#ffffff', ...props }) => {
  return (
    <svg width="53" height="52" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
      <path
        d="M6 21v2l-2 1-2-1v-2l3-2 17 2 5 2-16 3-7 9 5 10 17-8 10 8 9-1 4 1 2 2-2 2-3 1-2-3M5 18 15 7l9-5 16 4 7 9 2 10-4 19"
        stroke={fill}
        strokeWidth="3"
        strokeMiterlimit="10"
      />
    </svg>
  );
};

const Underline = ({ fill = '#ffffff', ...props }) => {
  return (
    <svg width="473" height="8" viewBox="0 0 473 8" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
      <path d="M1 6L199 2L274 6L472.5 2" stroke={fill} strokeWidth="4" />
    </svg>
  );
};

const P1Outline = ({ fill = '#ffffff', ...props }) => {
  return (
    <svg width="64" height="70" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
      <path
        d="M25.6 1 46 5.3c.5 0 .9.3 1.1.7l16 24.3.2.9L64 50c0 .5-.2.9-.5 1.2L46.6 69c-.3.4-.8.6-1.3.6l-29.6-1.2c-.6 0-1.1-.3-1.4-.9L4.7 49.8l-.2-.6L.9 20.3c-.1-.6.1-1.2.6-1.5L24.2 1.3c.4-.3 1-.4 1.4-.3ZM6.2 48.2 16.8 64c.3.5.8.8 1.4.8l25.7 1c.5 0 .9-.1 1.2-.4L61.8 50c.4-.3.6-.9.5-1.4L60.5 32c0-.3-.2-.6-.4-.8l-16.8-22c-.2-.3-.5-.5-.8-.6l-16-5.1c-.7-.2-1.4 0-1.9.4l-7.3 7.6-.4.3L4 19.7c-.6.3-.9 1-.8 1.6L6 47.4c0 .3 0 .6.2.8Z"
        fill={fill}
      />
    </svg>
  );
};

const P2Outline = ({ fill = '#ffffff', ...props }) => {
  return (
    <svg width="65" height="68" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
      <path
        d="M40.2 0 19.7 3.5c-.4.1-.8.4-1 .7L1.7 28l-.3.9L0 47.6c0 .4.1.9.4 1.2L8.5 58l8.1 9.2c.3.3.8.5 1.3.5h29.6c.6 0 1.1-.3 1.5-.8l10.3-17.3.2-.5 4.7-28.8c.1-.6-.1-1.2-.6-1.6L41.6.4c-.4-.3-1-.5-1.4-.4Zm17.6 48L46.6 63.4c-.3.5-.9.7-1.4.7H19.4c-.4 0-.9-.1-1.2-.5l-16-15.8c-.4-.4-.6-1-.5-1.5l2.5-16.6c0-.3.1-.6.3-.8L22.2 7.5c.2-.2.5-.4.9-.5l16.2-4.5c.6-.1 1.3 0 1.8.5l7 7.9.4.3L61 19.6c.5.3.8 1 .7 1.6l-3.7 26c0 .3-.2.6-.3.8Z"
        fill={fill}
      />
    </svg>
  );
};

const PlayerCursor = ({ fill = '#ffffff', ...props }) => {
  return (
    <svg width="19" height="20" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
      <path
        d="M15.9 1.1a15.6 15.6 0 0 1-6 2.5h-.5c-3-.5-8.9-4.6-8-1 .7 3.1 3.1 7 6.1 8.5 3 1.5 5.5 7.3 6.9 7.5 2.1.4 3.8-14 3.5-15.5-.4-1.6-1.4-2.6-2-2Z"
        fill={fill}
      />
    </svg>
  );
};

const icons = {
  border_basic: BorderBasic,
  axis_a: AxisA,
  underline: Underline,
  p1_outline: P1Outline,
  p2_outline: P2Outline,
  player_cursor: PlayerCursor,
};

// type IconsProps = {
//   id: keyof typeof icons;
// } & IconProps;

const Icons = ({ className, id, ...props }) => {
  const Icon = icons[id];

  if (!Icon) return null;
  return <Icon className={classNames(styles.tag, className)} aria-label={id} {...props} />;
};

export default Icons;
