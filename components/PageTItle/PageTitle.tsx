import styled from "styled-components";

export default function PageTitle({ title }) {
  return (
    <>
      <StyledHeading>{title}</StyledHeading>
      <Underline />
    </>
  );
}

const StyledHeading = styled.h2`
  font-family: var(--body-font);
  font-size: 3.2rem;
`;

const Underline = styled.div`
  width: 140px;
  height: 4px;
  background-color: var(--primary);
`;
