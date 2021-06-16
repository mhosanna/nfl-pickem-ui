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
`;

const List = styled.div`
  width: 50%;
  max-width: 800px;
  min-width: 600px;
  margin: 0 auto;
  display: flex;
  position: relative;
`;

export { Spread, List };
