import * as React from 'react';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faTrashAlt,
  faUndo
} from '@fortawesome/free-solid-svg-icons';
import { Icon, library, IconProp } from '@fortawesome/fontawesome-svg-core';
library.add({
  faTrashAlt,
  faUndo
});

const IconWrapper = styled.div``;

interface IIConProps {
  icon: IconProp,
  onClick?: () => void
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