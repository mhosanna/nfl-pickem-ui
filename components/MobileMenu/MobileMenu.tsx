import styled from "styled-components";
import { DialogOverlay, DialogContent } from "@reach/dialog";
import { usePlayer } from "../../lib/usePlayer";
import Icon from "../Icon";
import NavLink from "../Navigation-Link/NavigationLink";
import { season } from "../../config";
import SignOut from "../SignOut";

export default function MobileMenu({ isOpen, onDismiss, title }) {
  const player = usePlayer();
  return (
    <MobileModal isOpen={isOpen} onDismiss={onDismiss} title={""}>
      <Content aria-label={title}>
        <CloseButton onClick={onDismiss}>
          <Icon name="X" />
        </CloseButton>
        <NavLinks>
          <NavLink
            linkName="Leaderboard"
            href="/"
            handleClick={onDismiss}
            icon="TrendingUp"
          />
          {player && (
            <>
              <NavLink
                linkName="My Picks"
                href="/picks"
                handleClick={onDismiss}
                icon="CheckSquare"
              />
              <NavLink
                linkName="Game Results"
                href="/game-results"
                handleClick={onDismiss}
                icon="Star"
              />
              <NavLink
                linkName="Manage Games"
                href={`/manage-games/${season}`}
                handleClick={onDismiss}
                icon="Tv"
              />
              <NavLink
                linkName="Manage League"
                href="/manage-league"
                handleClick={onDismiss}
                icon="Settings"
              />
              <SignOut />
            </>
          )}
          {!player && (
            <>
              <NavLink
                linkName="Sign In"
                href="/signin"
                handleClick={onDismiss}
                icon="LogIn"
              />
            </>
          )}
        </NavLinks>
      </Content>
    </MobileModal>
  );
}

const MobileModal = styled(DialogOverlay)`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: hsl(0deg 0% 0% / 0.3);
  display: flex;
  justify-content: flex-start;
`;

const Content = styled(DialogContent)`
  background: var(--background);
  width: 300px;
  height: 100%;
  padding: 32px;
  display: flex;
  flex-direction: column;
  gap: 32px;
`;

const CloseButton = styled.button`
  padding: 16px;
  border: none;
  cursor: pointer;
  color: var(--black);
  background-color: var(--background);
  width: fit-content;
  align-self: flex-end;
`;

export const NavLinks = styled.nav`
  display: flex;
  flex-direction: column;
  gap: 3.5rem;
  margin: 0 auto;
`;
