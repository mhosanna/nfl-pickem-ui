import styled from 'styled-components';
import Navigation from '../Navigation';

const AppWrapper = styled.div`
  --menu-width-desktop: 300px;
  --menu-width-tablet: 250px;
  display: grid;
  grid-template-areas: 'menu content';
  grid-template-columns: var(--menu-width-desktop) 1fr;
  padding: 0px;
  max-width: 100%;
  isolation: isolate;

  @media ${(props) => props.theme.queries.tabletAndSmaller} {
    grid-template-columns: var(--menu-width-tablet) 1fr;
  }

  @media ${(props) => props.theme.queries.phoneAndSmaller} {
    grid-template-areas:
      'menu'
      'content';
    grid-template-rows: 75px 1fr;
    grid-template-columns: 1fr;
  }
`;

const OuterNavWrapper = styled.div`
  grid-area: menu;
  position: relative;
  z-index: 1;
  min-width: var(--menu-width-desktop);
  @media ${(props) => props.theme.queries.tabletAndSmaller} {
    min-width: var(--menu-width-tablet);
  }
`;

const NavWrapper = styled.div`
  padding: 5rem 0px;
  background-color: var(--background);
  position: fixed;
  top: 0px;
  height: 100%;
  min-width: var(--menu-width-desktop);
  @media ${(props) => props.theme.queries.tabletAndSmaller} {
    min-width: var(--menu-width-tablet);
  }

  @media ${(props) => props.theme.queries.phoneAndSmaller} {
    position: initial;
    display: flex;
    flex-direction: row-reverse;
    justify-content: flex-end;
    padding: 0px;
  }
`;

const InnerStyles = styled.div`
  grid-area: content;
  flex: 3;
  height: 100vh;
  padding: 5rem;
  @media ${(props) => props.theme.queries.tabletAndSmaller} {
    padding: 3rem 3rem;
  }
  @media ${(props) => props.theme.queries.phoneAndSmaller} {
    padding: 2rem 2.5rem;
  }
`;

export default function PageShell({ children }) {
  return (
    <AppWrapper>
      <OuterNavWrapper>
        <NavWrapper>
          <Navigation />
        </NavWrapper>
      </OuterNavWrapper>
      <InnerStyles>{children}</InnerStyles>
    </AppWrapper>
  );
}
