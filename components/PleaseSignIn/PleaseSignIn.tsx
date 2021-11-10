import React from 'react';
import styled from 'styled-components';
import { usePlayer } from '../../lib/usePlayer';
import RequestReset from '../RequestReset';
import { SignIn } from '../SignIn';

export default function PleaseSignIn({ children }) {
  const me = usePlayer();
  if (!me)
    return (
      <GridStyles>
        <SignIn />
        <RequestReset />
      </GridStyles>
    );
  return <>{React.cloneElement(children, { player: me })}</>;
}

const GridStyles = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  grid-gap: 2rem;
`;
