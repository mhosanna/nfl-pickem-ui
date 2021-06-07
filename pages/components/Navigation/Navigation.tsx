import { useState } from "react";
import styled from "styled-components";
import NavLink from "../Navigation-Link";

const NavigationStyles = styled.nav``;

const LogoFlourish = styled.div`
  position: relative;
  height: 4rem;
  width: 18rem;
  background: var(--secondary);
  transform: rotate(-12.59deg);
  border-radius: 3px;
`;

const Logo = styled.h1`
  font-family: var(--logo-font);
  font-weight: 400;
  font-size: 3.6rem;
  width: fit-content;
  padding: 0 0 77px 90px;

  ::after {
    content: "!";
    font-family: var(--logo-font);
    font-weight: 400;
    font-size: 4.8rem;
    line-height: 6rem;
    position: absolute;
  }
`;

const NavLinks = styled.div`
  display: flex;
  flex-direction: column;
  gap: 3.5rem;
  min-width: 320px;
`;

export default function Navigation() {
  const [openMobileMenu, setOpenMobileMenu] = useState(false);

  return (
    <NavigationStyles>
      <Logo>Pick’em</Logo>
      <NavLinks>
        <NavLink linkName="Leaderboard" href="/" icon="TrendingUp" />
        <NavLink linkName="My Picks" href="/picks" icon="CheckSquare" />
        <NavLink linkName="Game Results" href="/game-results" icon="Star" />
        <NavLink linkName="Manage Games" href="/manage-games" icon="Tv" />
        <NavLink
          linkName="Manage League"
          href="/manage-league"
          icon="Settings"
        />
      </NavLinks>
    </NavigationStyles>
  );
}
