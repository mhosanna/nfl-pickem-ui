import styled from "styled-components";
import Navigation from "../Navigation";

const AppWrapper = styled.div`
  display: grid;
  grid-template-areas:
    "menu content"
    "menu content";
  grid-template-columns: 300px 1fr;
  padding: 0px;
  max-width: 100%;

  @media ${(props) => props.theme.queries.phoneAndSmaller} {
    grid-template-areas:
      "menu"
      "content";
    grid-template-rows: 75px 1fr;
    grid-template-columns: 1fr;
  }
`;

const NavWrapper = styled.div`
  grid-area: menu;
  padding: 5rem 0px;
  background-color: var(--background);
  position: fixed;
  top: 0px;
  bottom: 0px;

  @media ${(props) => props.theme.queries.phoneAndSmaller} {
    position: initial;
    display: flex;
    flex-direction: row-reverse;
    justify-content: flex-end;
    gap: 36px;
    padding: 0px;
  }
`;

const InnerStyles = styled.div`
  grid-area: content;
  flex: 3;
  height: 100vh;
  padding: 5rem;
`;

export default function PageShell({ children }) {
  return (
    <AppWrapper>
      <NavWrapper>
        <Navigation />
      </NavWrapper>
      <InnerStyles>{children}</InnerStyles>
    </AppWrapper>
  );
}
