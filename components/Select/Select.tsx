import React from 'react';
import styled from 'styled-components';
import Icon from '../Icon';
import { getDisplayedValue } from './Select.helpers';

export default function Select({ label, value, onChange, children }) {
  const displayedValue = getDisplayedValue(value, children);

  return (
    <Wrapper>
      <NativeSelect value={value} onChange={onChange}>
        {children}
      </NativeSelect>
      <PresentationalBit>
        {displayedValue}
        <IconWrapper style={{ '--size': 24 + 'px' }}>
          <Icon name="ChevronDown" />
        </IconWrapper>
      </PresentationalBit>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  position: relative;
  width: max-content;
  min-width: 230px;
`;

const NativeSelect = styled.select`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  opacity: 0;
  font-size: 16px;
`;

const PresentationalBit = styled.div`
  color: var(--black);
  background-color: var(--background);
  font-size: 1.5rem;
  font-weight: 500;
  padding: 8px 16px;
  padding-right: 52px;
  border-radius: 8px;
  ${NativeSelect}:focus + & {
    outline: 1px dotted #212121;
    outline: 5px auto -webkit-focus-ring-color;
  }
  ${NativeSelect}:hover + & {
    color: var(--black);
  }
`;

const IconWrapper = styled.div`
  position: absolute;
  top: 0;
  bottom: 0;
  right: 10px;
  margin: auto;
  width: var(--size);
  height: var(--size);
  pointer-events: none;
`;
