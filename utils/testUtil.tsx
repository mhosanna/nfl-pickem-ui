import React, { ReactElement } from 'react';
import { render, RenderOptions, RenderResult } from '@testing-library/react';
import { ThemeProvider } from 'styled-components';
import { myTheme } from '../constants';
import { SeasonProvider } from '../lib/seasonContext';

type AllProvidersProps = {
  children: React.ReactElement;
};

const AllTheProviders = ({ children }: AllProvidersProps): ReactElement => {
  return (
    <ThemeProvider theme={myTheme}>
      <SeasonProvider>{children}</SeasonProvider>
    </ThemeProvider>
  );
};

const customRender = (
  ui: ReactElement,
  options?: Omit<RenderOptions, 'queries'>
): RenderResult => render(ui, { wrapper: AllTheProviders, ...options });

// re-export everything
export * from '@testing-library/react';

// override render method
export { customRender as render };
