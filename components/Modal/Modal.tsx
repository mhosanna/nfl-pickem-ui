import { DialogOverlay, DialogContent } from '@reach/dialog';
import styled from 'styled-components';
import Icon from '../Icon';

const MOBILE_BREAKPOINT = 550;

export default function Modal({ isOpen, handleDismiss, title, children }) {
  return (
    <Overlay isOpen={isOpen} onDismiss={handleDismiss}>
      <Content aria-label={title}>
        <Header>
          <Title>{title}</Title>
          <CloseButton onClick={handleDismiss}>
            <Icon name="X" />
          </CloseButton>
        </Header>
        <ChildrenWrapper>{children}</ChildrenWrapper>
      </Content>
    </Overlay>
  );
}

const Overlay = styled(DialogOverlay)`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: hsl(0deg 0% 0% / 0.3);
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Content = styled(DialogContent)`
  position: relative;
  background: white;
  border-radius: 5px;
  width: 450px;

  @media (max-width: ${MOBILE_BREAKPOINT}px) {
    width: 100%;
    height: 100%;
    border-radius: 0px;
  }
`;

const CloseButton = styled.button`
  position: absolute;
  top: 14px;
  right: 8px;
  background: transparent;
  border: none;
  width: 48px;
  height: 48px;
  cursor: pointer;
  color: var(--black);

  @media (max-width: ${MOBILE_BREAKPOINT}px) {
    position: static;
    color: var(--black);
  }
`;

const Header = styled.header`
  padding: 24px;
  padding-top: 12px;
  padding-bottom: 0px;

  @media (max-width: ${MOBILE_BREAKPOINT}px) {
    padding: 4px;
    padding-left: 16px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-bottom: 1px solid hsl(0deg 0% 80%);
  }
`;

const Title = styled.h2`
  font-size: 2.4rem;
`;

const ChildrenWrapper = styled.div`
  padding: 16px 24px;
`;
