import styled from "styled-components";

const Spread = styled.div`
  height: 100px;
  width: 100px;
  border-radius: 50%;
  position: absolute;
  right: 250px;
  top: -11px;
  background-color: white;
  border: 4px solid var(--primary);
  display: flex;
  justify-content: center;
  align-items: center;
  &:after {
    content: "${(props) => props.spread}";
    font-size: 2rem;
    font-weight: 700;
  }
  @media ${(props) => props.theme.queries.tabletAndSmaller} {
    position: absolute;
    right: 40%;
    top: -5px;
    height: 70px;
    width: 70px;
  }
`;

const List = styled.div`
  width: 50%;
  max-width: 800px;
  min-width: 600px;
  margin: 0 auto;
  display: flex;
  position: relative;
  @media ${(props) => props.theme.queries.tabletAndSmaller} {
    width: 100%;
    max-width: 500px;
    min-width: 0px;
  }
`;

export { Spread, List };
