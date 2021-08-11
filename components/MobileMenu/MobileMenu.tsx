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
      </Content>
    </MobileModal>
  );
}

export const MobileModal = styled(DialogOverlay)`
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
  padding: 75px 32px;
  display: flex;
  flex-direction: column;
`;

const CloseButton = styled.button`
  position: absolute;
  top: 10px;
  right: 0;
  padding: 16px;
  border: none;
  cursor: pointer;
  color: var(--black);
`;

const NavLinks = styled.nav`
  display: flex;
  flex-direction: column;
  gap: 3.5rem;
  margin: 0 auto;
`;

const Filler = styled.div`
  flex: 1;
`;
