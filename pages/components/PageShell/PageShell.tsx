import styled from "styled-components";
import Navigation from "../Navigation";

const AppWrapper = styled.div`
  display: flex;
`;

const NavWrapper = styled.div`
  flex: 1;
  height: 100vh;
  padding: 30px 0px;
  background-color: var(--background);
`;

const InnerStyles = styled.div`
  flex: 3;
  height: 100vh;
  margin: 0 auto;
  padding: 2rem;
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
