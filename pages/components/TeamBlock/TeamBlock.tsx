import styled from "styled-components";

const BlockBase = styled.button`
  border: none;
  width: 50%;
  height: 80px;
  background-color: ${(props) =>
    props.isPicked ? "var(--black)" : "var(--background)"};
  color: ${(props) => (props.isPicked ? "white" : "initial")};
  border-radius: 3px;
  font-size: 1.8rem;
  line-height: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 8px;
`;

const HomeBlock = styled(BlockBase)`
  padding: 0px 40px;
`;

const AwayBlock = styled(BlockBase)`
  padding-left: 100px;
`;

export default function TeamBlock({
  id,
  name,
  city,
  field,
  isWinner = false,
  isPicked = false,
  makePick,
}) {
  let Component;
  if (field === "home") {
    Component = HomeBlock;
  } else if (field === "away") {
    Component = AwayBlock;
  } else {
    throw new Error(`Unrecognized Team Field: ${field}`);
  }
  return (
    <Component isPicked={isPicked} onClick={() => makePick(id)}>
      <span style={{ fontWeight: "bold" }}>{city}</span>
      <span>{name}</span>
    </Component>
  );
}
