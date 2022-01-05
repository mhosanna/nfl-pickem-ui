import styled from 'styled-components';
import Icon from '../Icon';

const iconStatus = {
  loading: {
    name: 'Loader',
    'data-testid': 'pick-loading',
    className: 'spinner',
  },
  error: {
    name: 'AlertTriangle',
    'data-testid': 'pick-error',
  },
  data: {
    name: 'CheckSquare',
    'data-testid': 'picked-team',
  },
};

export default function TeamBlock({
  id,
  name,
  city,
  field,
  isWinner = false,
  isPicked = false,
  makePick,
  wasClicked,
  pickStatus,
}) {
  let Component;
  let WinFlag;
  if (field === 'home') {
    Component = HomeBlock;
    WinFlag = HomeFlag;
  } else if (field === 'away') {
    Component = AwayBlock;
    WinFlag = AwayFlag;
  } else {
    throw new Error(`Unrecognized Team Field: ${field}`);
  }

  const { loading, error } = pickStatus;

  let iconProps;
  if (isPicked) {
    iconProps = iconStatus['data'];
  }
  if (loading && wasClicked) {
    iconProps = iconStatus['loading'];
  }
  if (error && wasClicked) {
    iconProps = iconStatus['error'];
  }

  // show error/loading icon only on the team block that was clicked,
  // or show picked icon on previously picked team
  const showIcon = ((error || loading) && wasClicked) || isPicked;

  return (
    <>
      <Component
        isPicked={isPicked}
        hasIcon={showIcon}
        onClick={() => makePick(id)}
      >
        {isWinner && <WinFlag>Game Winner</WinFlag>}
        {showIcon && <PickedIcon {...iconProps} />}
        <TeamName>
          <span style={{ fontWeight: 'bold' }}>{city}</span>
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

const BlockBase = styled.button<{ isPicked: boolean }>`
  border: none;
  width: 50%;
  height: 80px;
  background-color: ${(props) =>
    props.isPicked ? 'var(--black)' : 'var(--background)'};
  color: ${(props) => (props.isPicked ? 'white' : 'initial')};
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

const HomeBlock = styled(BlockBase)<{ hasIcon: boolean }>`
  padding: ${(props) => (props.hasIcon ? '0px 24px' : '0px 60px')};

  @media ${(props) => props.theme.queries.tabletAndSmaller} {
    padding: ${(props) => (props.hasIcon ? '0px 40px 0px 8px' : '0px 40px')};
  }
`;

const AwayBlock = styled(BlockBase)<{ hasIcon: boolean }>`
  padding-left: ${(props) => (props.hasIcon ? '74px' : '110px')};

  @media ${(props) => props.theme.queries.tabletAndSmaller} {
    padding-left: ${(props) => (props.hasIcon ? '50px' : '79px')};
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
