import styled from "styled-components";
import Navigation from "../Navigation";
import Spacer from "../Spacer";

const AppWrapper = styled.div`
  display: flex;
`;

const NavWrapper = styled.div`
  flex: 1;
  height: 100vh;
  padding: 40px 0px;
  background-color: var(--background);
`;

const InnerStyles = styled.div`
  flex: 3;
  height: 100vh;
  margin: 0 auto;
  padding: 0px 5rem;
`;

export default function PageShell({ children }) {
  return (
    <AppWrapper>
      <NavWrapper>
        <Navigation />
      </NavWrapper>
      <InnerStyles>
        <Spacer size={48} />
        {children}
      </InnerStyles>
    </AppWrapper>
  );
}
