import * as React from 'react';
import styled from 'styled-components';
import { Box, ModalBox } from './layout';
import Icon from './Icon';


const Overlay = styled.div`
  position: fixed;
  z-index: 999;
  left: 0;
  top: 0;
  width: 100vw;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: rgba(252, 252, 252, 0.9);
`;
const Header = styled.div`
  padding-bottom: 10px;
  border-bottom: 1px dotted #ddd;
  display: flex;
`;

const Heading = styled.h3`
  flex: 1;
  color: #333;
`;

interface IModalProps {
  heading: string
  children?: React.ReactNode,
  show: boolean,
  close: (e: any) => void
}

const Modal: React.StatelessComponent<IModalProps> = ({
  children,
  heading,
  show,
  close
}) => {
  if (!show) {
    return null;
  }

  return (
    <Overlay>
      <ModalBox width='500px' bg='rgb(252, 252, 252)' p="30px">
        <Header>
          <Heading>{ heading }</Heading>
          <Icon color="#7f7f7f" onClick={ close } icon={'times'} />
        </Header>
        <Box mt="10px">
          { children }
        </Box>
      </ModalBox>
    </Overlay>
  );
};

export default Modal;