import * as React from 'react';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faTrashAlt,
  faUndo,
  faTimes,
  faEdit
} from '@fortawesome/free-solid-svg-icons';
import { Icon, library, IconProp } from '@fortawesome/fontawesome-svg-core';
library.add({
  faTrashAlt,
  faUndo,
  faEdit,
  faTimes
});

const IconWrapper = styled.div`
  cursor: pointer;
  display: inline-block;
  margin-right: 5px;
`;

interface IIConProps {
  icon: IconProp,
  onClick?: (e: any) => void
}

const Icon: React.StatelessComponent<IIConProps> = ({
  icon,
  onClick
}) => {
  return (
    <IconWrapper onClick={onClick}>
      <FontAwesomeIcon icon={icon} />
    </IconWrapper>
  )
}

export default Icon