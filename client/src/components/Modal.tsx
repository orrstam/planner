import * as React from 'react';
import styled from 'styled-components';
import { Box, ModalBox } from './layout';
import Icon from './Icon';


const Overlay = styled.div`
  position: fixed;
  left: 0;
  top: 0;
  width: 100vw;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: rgba(0, 0, 0, 0.4);
`;
const Header = styled.div`
  padding-bottom: 5px;
  border-bottom: 1px solid #ddd;
  display: flex;
`;

const Heading = styled.h3`
  flex: 1;
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
      <ModalBox width='300px' bg='background' p="10px">
        <Header>
          <Heading>{ heading }</Heading>
          <Icon onClick={ close } icon={'times'} />
        </Header>
        <Box mt="10px">
          { children }
        </Box>
      </ModalBox>
    </Overlay>
  );
};

export default Modal;