// import original module declarations
import 'styled-components';

// and extend them!
declare module 'styled-components' {
  export interface DefaultTheme {
    queries: {
      phoneAndSmaller: string;
      tabletAndSmaller: string;
      laptopAndSmaller: string;
    };
    breakpoints: {
      tabletMin: number;
      laptopMin: number;
      desktopMin: number;
    };
  }
}
