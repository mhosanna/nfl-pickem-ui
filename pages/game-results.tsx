import type { ReactElement } from 'react';
import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import styled from 'styled-components';
import PageHeading from '../components/PageHeading';
import PageTitle from '../components/PageTItle';
import GameResults from '../components/GameResults';
import { season } from '../config';

export default function GameResultsPage() {
  return (
    <>
      <PageHeading heading="Game Results" season={season} />
    </>
  );
}

function ResultsSubMenu() {
  const {
    query: { by },
  } = useRouter();

  return (
    <SubNav>
      <PageTitle size={2.4} isActive={by === 'player'}>
        <ActiveLink
          href={{ pathname: '/game-results', query: { by: 'player' } }}
        >
          <NavLink>Picks by Player</NavLink>
        </ActiveLink>
      </PageTitle>
      <PageTitle size={2.4} isActive={by === 'game'}>
        <ActiveLink href={{ pathname: '/game-results', query: { by: 'game' } }}>
          <NavLink>Picks by Game</NavLink>
        </ActiveLink>
      </PageTitle>
    </SubNav>
  );
}

interface Props {
  href: { pathname: string; query: { by: string } };
  children: ReactElement;
}

const ActiveLink = ({ children, href }: Props) => {
  const { query } = useRouter();
  const child = React.Children.only(children);

  return (
    <Link href={href} passHref>
      {React.cloneElement(child, {
        active: `${query.by}` === `${href.query.by}`,
      })}
    </Link>
  );
};

const SubNav = styled.nav`
  display: flex;
  flex-direction: row;
  gap: 10rem;
`;

export const NavLink = styled.a<{ active?: boolean }>`
  text-decoration: none;
  color: ${(props) => (props.active ? 'black' : 'var(--grey)')};
  cursor: pointer;
`;

GameResultsPage.getLayout = function getLayout(page: ReactElement) {
  return (
    <>
      {page}
      <ResultsSubMenu />
      <GameResults season={season} />
    </>
  );
};
