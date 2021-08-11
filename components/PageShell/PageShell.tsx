import styled from "styled-components";
import Navigation from "../Navigation";
import Spacer from "../Spacer";

const AppWrapper = styled.div`
  display: grid;
  grid-template-columns: 300px 1fr;
  padding: 0px;
  max-width: 100%;
`;

const NavOuterWrapper = styled.div`
  position: relative;
`;

const NavWrapper = styled.div`
  padding: 5rem 0px;
  background-color: var(--background);
  position: fixed;
  top: 0px;
  bottom: 0px;

  @media ${(props) => props.theme.queries.phoneAndSmaller} {
    min-width: 75px;
  }
`;

const InnerStyles = styled.div`
  flex: 3;
  height: 100vh;
  padding: 5rem;
`;

export default function PageShell({ children }) {
  return (
    <AppWrapper>
      <NavOuterWrapper>
        <NavWrapper>
          <Navigation />
        </NavWrapper>
      </NavOuterWrapper>
      <InnerStyles>{children}</InnerStyles>
    </AppWrapper>
  );
}
