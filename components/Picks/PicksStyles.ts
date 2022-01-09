import styled from 'styled-components';

const GameListWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 35px;
  padding-bottom: 35px;
  @media ${(props) => props.theme.queries.tabletAndSmaller} {
    gap: 25px;
    padding-bottom: 25px;
  }
`;

const FieldWrapper = styled.div`
  display: flex;
  margin: 0 auto;
  justify-content: space-between;
  width: 50%;
  margin: 0 auto;
  margin-bottom: -18px;

  h3 {
    text-transform: uppercase;
    color: var(--grey);
  }
`;

const Spread = styled.div<{ spread: string }>`
  height: 100px;
  width: 100px;
  border-radius: 50%;
  position: absolute;
  margin-left: auto;
  margin-right: auto;
  left: 0;
  right: 0;
  top: -14px;
  background-color: white;
  border: 4px solid var(--primary);
  display: flex;
  justify-content: center;
  align-items: center;
  &:after {
    content: '${(props) => props.spread}';
    font-size: 2rem;
    font-weight: 700;
  }
  @media ${(props) => props.theme.queries.tabletAndSmaller} {
    height: 70px;
    width: 70px;
    top: -4px;
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
  @media ${(props) => props.theme.queries.phoneAndSmaller} {
    width: 100%;
    max-width: none;
    min-width: 0px;
  }
`;

export { Spread, List, FieldWrapper, GameListWrapper };
