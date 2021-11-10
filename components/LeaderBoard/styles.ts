import styled from 'styled-components';

export const TableStyles = styled.table`
  border-collapse: collapse;
  width: 90%;
  max-width: 800px;
  thead {
    color: var(--grey);
    text-transform: uppercase;
    margin-bottom: 12px;
  }
  tbody {
    font-weight: 600;
    font-size: 2rem;
  }
  td,
  th {
    text-align: left;
    padding: 8px 24px 0px 8px;
  }
  th:last-child,
  td:last-child {
    padding-right: 0px;
  }
  th:first-child,
  td:first-child {
    padding-left: 0px;
  }

  @media ${(props) => props.theme.queries.tabletAndSmaller} {
    th {
      line-height: 1.3;
    }
  }
`;
