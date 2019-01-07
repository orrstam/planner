import * as React from 'react';
import styled, { css } from 'styled-components';
import Icon from './Icon';

interface IFormSuccessProps {
  formSuccess: boolean
}

interface IIconWrapperProps {
  show: boolean
}

const IconWrapper = styled.div`
  position: absolute;
  left: 50%;
  margin-left: -32px;
  margin-top: -32px;
  top: 50%;
  opacity: 0;
  transition: opacity 1s linear .5s;
  ${(props: IIconWrapperProps) => (props.show ? showStyle : '')}
`;

const showStyle = css`
  opacity: 1;
  visibility: visible;
`;

const FormSuccess: React.StatelessComponent<IFormSuccessProps> = ({formSuccess}) => {
  return(
    <IconWrapper show={(formSuccess) ? true : false}>
      <Icon icon="check" color="rgba(149, 195, 141, 1)" size="6x" />
    </IconWrapper>
  )
}

export default FormSuccess;