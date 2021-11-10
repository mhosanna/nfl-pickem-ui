import * as React from 'react';
import { season as configSeason } from '../config';

type Dispatch = React.Dispatch<React.SetStateAction<string>>;
type State = string;
type SeasonProviderProps = { children: React.ReactNode };

const SeasonContext = React.createContext<
  { season: State; setSeason: Dispatch } | undefined
>(undefined);

function SeasonProvider({ children }: SeasonProviderProps) {
  const [season, setSeason] = React.useState(configSeason);

  const value = { season, setSeason };
  return (
    <SeasonContext.Provider value={value}>{children}</SeasonContext.Provider>
  );
}

function useSeason() {
  const context = React.useContext(SeasonContext);
  if (context === undefined) {
    throw new Error('useSeason must be used within a SeasonProvider');
  }
  return context;
}
export { SeasonProvider, useSeason };
