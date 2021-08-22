import styled from "styled-components";
import Icon from "../Icon";

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
  let WinFlag;
  if (field === "home") {
    Component = HomeBlock;
    WinFlag = HomeFlag;
  } else if (field === "away") {
    Component = AwayBlock;
    WinFlag = AwayFlag;
  } else {
    throw new Error(`Unrecognized Team Field: ${field}`);
  }
  return (
    <>
      <Component isPicked={isPicked} onClick={() => makePick(id)}>
        {isWinner && <WinFlag>Game Winner</WinFlag>}
        {isPicked && (
          <PickedIcon
            name={"CheckSquare"}
            data-testid="picked-team"
            isPicked={isPicked}
          />
        )}
        <TeamName>
          <span style={{ fontWeight: "bold" }}>{city}</span>
          <span>{name}</span>
        </TeamName>
      </Component>
    </>
  );
}

const PickedIcon = styled(Icon)`
  min-width: 24px;
  width: 24px;
  height: 24px;
  @media ${(props) => props.theme.queries.tabletAndSmaller} {
    min-width: 18px;
    width: 18px;
    height: 18px;
  }
  @media ${(props) => props.theme.queries.phoneAndSmaller} {
    min-width: 16px;
    width: 16px;
    height: 16px;
  }
`;

const TeamName = styled.div`
  display: flex;
  flex-direction: column;
  align-items: end;
  gap: 8px;
`;

const BlockBase = styled.button`
  border: none;
  width: 50%;
  height: 80px;
  background-color: ${(props) =>
    props.isPicked ? "var(--black)" : "var(--background)"};
  color: ${(props) => (props.isPicked ? "white" : "initial")};
  border-radius: 3px;
  font-size: clamp(1rem, 4vw, 1.8rem);
  line-height: 1;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
  gap: 12px;
  position: relative;
  white-space: nowrap;

  @media ${(props) => props.theme.queries.tabletAndSmaller} {
    height: 70px;
  }
`;

const HomeBlock = styled(BlockBase)`
  padding: ${(props) => (props.isPicked ? "0px 24px" : "0px 60px")};

  @media ${(props) => props.theme.queries.tabletAndSmaller} {
    padding: ${(props) => (props.isPicked ? "0px 40px 0px 8px" : "0px 40px")};
  }
`;

const AwayBlock = styled(BlockBase)`
  padding-left: ${(props) => (props.isPicked ? "74px" : "110px")};

  @media ${(props) => props.theme.queries.tabletAndSmaller} {
    padding-left: ${(props) => (props.isPicked ? "50px" : "79px")};
  }
`;

const FlagBase = styled.div`
  position: absolute;
  background-color: var(--primary);
  padding: 5px 12px;
  font-size: 1.2rem;
  border-radius: 50px;
  color: white;
`;

const HomeFlag = styled(FlagBase)`
  top: -12px;
  left: -10px;
`;
const AwayFlag = styled(FlagBase)`
  top: -12px;
  right: -10px;
`;
