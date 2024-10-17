import { Variant, Variants } from 'framer-motion';
import { bezier } from '../helpers/easing';

type DirectonalTransform = {
  x?: string | number;
  y?: string | number;
};

export const baseVariants: Variants = {
  initial: 'initial' as unknown as Variant,
  animate: 'animate' as unknown as Variant,
  exit: 'exit' as unknown as Variant,
};

export const baseTransition = {
  duration: 0.5,
  ease: bezier.quadEaseIn,
  // opacity: { duration: 0.5, ease: 'linear' },
};

export const pageTransitionIn = {
  animate: { opacity: 0, transition: { duration: 1.5 }, ease: bezier.principle },
};

export const pageTransitionExit = {
  variants: {
    initial: { opacity: 1 },
    animate: { opacity: 1 },
    exit: { opacity: 0 },
  },
  transition: {
    duration: 1,
  },
};

export const pageTransition = {
  variants: {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    exit: { opacity: 0 },
  },
  transition: {
    duration: 0.8,
  },
};

export const conditionalAnimation = (condition: boolean, animateOverride: Variants) =>
  ({
    initial: baseVariants.initial,
    animate: (condition ? animateOverride.animate || baseVariants.animate : baseVariants.initial) as Variant,
    // exit: baseVariants.exit,
  } as Variants);

export const orchestrate = ({ stagger = 0, delay = 0 }) => ({
  variants: {
    animate: {
      transition: { staggerChildren: stagger, delayChildren: delay },
    },
  },
});

// export const cardAnimation = {
//   variants: {
//     initial: ({ y }: DirectonalTransform = {}) => ({ opacity: 0, y: y || 50 }),
//     animate: {
//       y: 0,
//     },
//     exit: ({ y }: DirectonalTransform = {}) => ({
//       y: -(y as number) || -50,
//       transition: {
//         ...baseTransition,
//         duration: 0.5,
//         ease: bezier.quadEaseIn,
//       },
//     }),
//   },
// };
