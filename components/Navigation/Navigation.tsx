import { useState } from "react";
import styled from "styled-components";
import NavLink from "../Navigation-Link";
import { season } from "../../config";
import { usePlayer } from "../../lib/usePlayer";
import SignOut from "../SignOut";
import Icon from "../Icon";
import MobileMenu from "../MobileMenu";

export default function Navigation() {
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const player = usePlayer();
  return (
    <>
      <Logo>Pick’em</Logo>
      <DesktopNav>
        <NavLinks>
          <NavLink linkName="Leaderboard" href="/" icon="TrendingUp" />
          {player && (
            <>
              <NavLink linkName="My Picks" href="/picks" icon="CheckSquare" />
              <NavLink
                linkName="Game Results"
                href="/game-results"
                icon="Star"
              />
              <NavLink
                linkName="Manage Games"
                href={`/manage-games/${season}`}
                icon="Tv"
              />
              <NavLink
                linkName="Manage League"
                href="/manage-league"
                icon="Settings"
              />
              <SignOut />
            </>
          )}
          {!player && (
            <>
              <NavLink linkName="Sign In" href="/signin" icon="LogIn" />
            </>
          )}
        </NavLinks>
      </DesktopNav>
      <MobileAction>
        <MenuButton onClick={() => setShowMobileMenu(true)}>
          <Icon name={"Menu"} size={36} />
        </MenuButton>
      </MobileAction>
      <MobileMenu
        isOpen={showMobileMenu}
        onDismiss={() => setShowMobileMenu(false)}
        title="Menu"
      />
    </>
  );
}

const DesktopNav = styled.nav`
  display: flex;

  @media ${(props) => props.theme.queries.phoneAndSmaller} {
    display: none;
  }
`;

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
  margin: 0 auto;
  margin-bottom: 56px;

  ::after {
    content: "!";
    font-family: var(--logo-font);
    font-weight: 400;
    font-size: 4.8rem;
    line-height: 6rem;
    position: absolute;
  }

  @media ${(props) => props.theme.queries.phoneAndSmaller} {
    margin: 0;
    margin-bottom: 0;
  }
`;

const NavLinks = styled.div`
  display: flex;
  flex-direction: column;
  gap: 3.5rem;
  width: 100%;
`;

const MobileAction = styled.div`
  display: none;
  @media ${(props) => props.theme.queries.tabletAndSmaller} {
  }
  @media ${(props) => props.theme.queries.phoneAndSmaller} {
    display: flex;
    align-items: center;
    padding: 0px 28px;
    height: 100%;
  }
`;

const MenuButton = styled.button`
  display: flex;
  align-items: baseline;
  padding: 0;
  border: none;
  background: transparent;
  cursor: pointer;
  text-align: left;
  font: inherit;
  color: inherit;
  &:focus {
    outline-offset: 2px;
  }
  &:focus:not(:focus-visible) {
    outline: none;
  }
`;
