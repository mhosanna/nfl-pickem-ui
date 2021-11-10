import styled from 'styled-components';
import Icon from '../Icon';

type AppProps = {
  type: TileType;
  children: string;
};

type TileType = 'success' | 'error';

export default function Tile({ type, children }: AppProps) {
  return (
    <TileStyle type={type}>
      {type === 'success' && (
        <Icon name="Check" size={15} color={'var(--gray700)'} />
      )}
      <span>{children}</span>
    </TileStyle>
  );
}

const TileStyle = styled.div`
  display: flex;
  align-items: center;
  gap: 2px;
  max-height: 20px;
  padding: 1px 12px;
  border: 2px solid
    ${(props) =>
      props.type === 'success' ? 'var(--successDark)' : 'var(--warning)'};
  border-radius: 50px;
  font-size: 1.2rem;
  background-color: ${(props) =>
    props.type === 'success' ? 'var(--success)' : 'var(--warningLight)'};
`;
