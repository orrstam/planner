import * as React from 'react';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faTrashAlt,
  faUndo,
  faTimes,
  faEdit,
  faPlusCircle,
  faMinusCircle,
  faCheck,
  faAngleDown,
  faAngleUp
} from '@fortawesome/free-solid-svg-icons';
import { Icon, library, IconProp } from '@fortawesome/fontawesome-svg-core';
library.add({
  faTrashAlt,
  faUndo,
  faEdit,
  faTimes,
  faPlusCircle,
  faMinusCircle,
  faCheck,
  faAngleDown,
  faAngleUp
});

const IconWrapper = styled.div`
  cursor: pointer;
  display: inline-block;
`;

interface IIConProps {
  icon: IconProp,
  onClick?: (e: any) => void,
  size?: any,
  color: string,
  space?: string
}

const Icon: React.StatelessComponent<IIConProps> = ({
  icon,
  onClick,
  size,
  color,
  space
}) => {
  return (
    <IconWrapper onClick={onClick}>
      <FontAwesomeIcon size={(size) ? size : '1x'} style={{ color: color, zIndex: 9999, margin: space }} icon={icon} />
    </IconWrapper>
  )
}

export default Icon