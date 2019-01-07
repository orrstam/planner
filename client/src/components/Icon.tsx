import * as React from 'react';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faTrashAlt,
  faUndo,
  faTimes,
  faEdit,
  faPlusCircle,
  faMinusCircle
} from '@fortawesome/free-solid-svg-icons';
import { Icon, library, IconProp } from '@fortawesome/fontawesome-svg-core';
library.add({
  faTrashAlt,
  faUndo,
  faEdit,
  faTimes,
  faPlusCircle,
  faMinusCircle
});

const IconWrapper = styled.div`
  cursor: pointer;
  display: inline-block;
  margin-left: 8px;
`;

interface IIConProps {
  icon: IconProp,
  onClick?: (e: any) => void,
  size?: any,
  color: string
}

const Icon: React.StatelessComponent<IIConProps> = ({
  icon,
  onClick,
  size,
  color
}) => {
  return (
    <IconWrapper onClick={onClick}>
      <FontAwesomeIcon size={(size) ? size : '1x'} style={{ color: color }} icon={icon} />
    </IconWrapper>
  )
}

export default Icon