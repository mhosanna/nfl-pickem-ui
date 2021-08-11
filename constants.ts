const BREAKPOINTS = {
    tabletMin: 550,
    laptopMin: 1100,
    desktopMin: 1500,
  }
  const QUERIES = {
    'phoneAndSmaller': `(max-width: ${BREAKPOINTS.tabletMin / 16}rem)`,
    'tabletAndSmaller': `(max-width: ${BREAKPOINTS.laptopMin / 16}rem)`,
    'laptopAndSmaller': `(max-width: ${BREAKPOINTS.desktopMin / 16}rem)`,
  }

  export {BREAKPOINTS, QUERIES}