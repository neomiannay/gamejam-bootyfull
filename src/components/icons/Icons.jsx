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
        stroke-width="3"
        stroke-miterlimit="10"
      />
    </svg>
  );
};

const Underline = ({ fill = '#ffffff', ...props }) => {
  return (
    <svg width="473" height="8" viewBox="0 0 473 8" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
      <path d="M1 6L199 2L274 6L472.5 2" stroke={fill} stroke-width="4" />
    </svg>
  );
};

const icons = {
  border_basic: BorderBasic,
  axis_a: AxisA,
  underline: Underline,
};

// type IconsProps = {
//   id: keyof typeof icons;
// } & IconProps;

const Icons = ({ className, id, ...props }) => {
  console.log(className);

  const Icon = icons[id];

  if (!Icon) return null;
  return <Icon className={classNames(styles.tag, className)} aria-label={id} {...props} />;
};

export default Icons;
