import styled from "styled-components";
import Icon from "../Icon";

export default function AddNewTile({ label, icon, onClick }) {
  return (
    <StyledTile onClick={onClick}>
      <Icon name={icon} />
      <span>{label}</span>
    </StyledTile>
  );
}

const StyledTile = styled.button`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  color: var(--gray300);
  background-color: white;
  border: 1px dashed var(--gray300);
  border-radius: 5px;
  width: 175px;
  height: 80px;
  &:hover {
    color: var(--gray700);
    border: 1px dashed var(--gray700);
  }
`;
