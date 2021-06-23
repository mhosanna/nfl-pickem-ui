import styled from "styled-components";

const HeaderWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: baseline;
  margin-bottom: 5rem;
  line-height: 1;
`;

const StyledHeading = styled.h1`
  font-family: var(--header-font);
  font-size: 4.8rem;
  text-transform: uppercase;
  letter-spacing: 0.15rem;
`;

const Underline = styled.div`
  width: 190px;
  height: 8px;
  background-color: var(--secondary);
  margin-top: 1rem;
`;

const Season = styled.div`
  color: var(--grey);
  font-size: 2em;
`;

export default function PageHeading({ heading, season }) {
  return (
    <HeaderWrapper>
      <div>
        <StyledHeading>{heading}</StyledHeading>
        <Underline />
      </div>
      <Season>{season} Season</Season>
    </HeaderWrapper>
  );
}
