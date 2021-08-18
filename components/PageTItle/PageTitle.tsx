import styled from "styled-components";

export default function PageTitle({ title }) {
  return (
    <Wrapper>
      <StyledHeading dangerouslySetInnerHTML={{ __html: title }} />
      <Underline />
    </Wrapper>
  );
}

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

const StyledHeading = styled.h2`
  font-family: var(--body-font);
  font-size: 3.2rem;
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

const Underline = styled.div`
  width: 140px;
  height: 4px;
  background-color: var(--primary);
`;
