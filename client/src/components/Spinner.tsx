import * as React from 'react';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faSpinner
} from '@fortawesome/free-solid-svg-icons';
import { library, IconProp } from '@fortawesome/fontawesome-svg-core';
library.add({
  faSpinner
});

const IconWrapper = styled.div`
  animation: rotate 1.5s linear infinite;

  @keyframes rotate {
    100% {
      transform: rotate(360deg);
    }
  }
  @keyframes dash {
    0% {
      stroke-dasharray: 1, 150;
      stroke-dashoffset: 0;
    }
    100% {
      stroke-dasharray: 90, 150;
      stroke-dashoffset: -124;
    }
  }
  @keframes fadeOut {
    100% {
      opacity: 1
    }
    0% {
      opacity: 0
    }
  }
`;

interface SpinnerProps {
  icon: IconProp,
  size?: any,
  color: string
}

const Spinner: React.FC<SpinnerProps> = ({
  icon,
  size,
  color
}) => {
  return (
    <IconWrapper>
      <FontAwesomeIcon size={(size) ? size : '1x'} style={{ color: color }} icon={icon} />
    </IconWrapper>
  )
}

export default Spinner;