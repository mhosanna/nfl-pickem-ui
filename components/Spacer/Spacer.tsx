//from https://www.joshwcomeau.com/react/modern-spacer-gif/
import styled from 'styled-components';

type axisType = 'horizontal' | 'vertical';
type SpacerProps = {
  axis?: axisType;
  size: number;
};

function getHeight({ axis, size }: SpacerProps) {
  return axis === 'horizontal' ? 1 : size;
}
function getWidth({ axis, size }: SpacerProps) {
  return axis === 'vertical' ? 1 : size;
}
const Spacer = styled.span<SpacerProps>`
  display: block;
  width: ${getWidth}px;
  min-width: ${getWidth}px;
  height: ${getHeight}px;
  min-height: ${getHeight}px;
`;
export default Spacer;
