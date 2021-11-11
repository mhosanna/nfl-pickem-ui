import styled from 'styled-components';
// import { NavLink } from "../../pages/game-results";

export default function PageTitle({ children, size = 3.2, isActive = true }) {
  return (
    <Wrapper>
      <StyledHeading size={size}>{children}</StyledHeading>
      <Underline isActive={isActive} />
    </Wrapper>
  );
}

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

const StyledHeading = styled.h2<{ size: number }>`
  font-family: var(--body-font);
  font-size: ${(props) => props.size}rem;
  line-height: 1;
  display: flex;
  gap: 12px;
  span {
    flex: 0 0 auto;
  }
  span:last-child {
    flex: 1 2 auto;
  }

  @media ${(props) => props.theme.queries.tabletAndSmaller} {
    font-size: 2.6rem;
  }
  @media ${(props) => props.theme.queries.phoneAndSmaller} {
    font-size: 2rem;
  }
`;

const Underline = styled.div<{ isActive: boolean }>`
  display: ${(props) => (props.isActive ? 'inline' : 'none')};
  width: 140px;
  height: 4px;
  background-color: var(--primary);
`;
