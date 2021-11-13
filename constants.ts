import { DefaultTheme } from 'styled-components';

const BREAKPOINTS = {
  tabletMin: 715,
  laptopMin: 1100,
  desktopMin: 1500,
};

const myTheme: DefaultTheme = {
  breakpoints: {
    tabletMin: BREAKPOINTS.tabletMin,
    laptopMin: BREAKPOINTS.laptopMin,
    desktopMin: BREAKPOINTS.desktopMin,
  },
  queries: {
    phoneAndSmaller: `(max-width: ${BREAKPOINTS.tabletMin / 16}rem)`,
    tabletAndSmaller: `(max-width: ${BREAKPOINTS.laptopMin / 16}rem)`,
    laptopAndSmaller: `(max-width: ${BREAKPOINTS.desktopMin / 16}rem)`,
  },
};

export { myTheme };
