import * as React from 'react';
import styled, { keyframes } from 'styled-components';
import {
  width,
  space,
  color,
  top,
  boxShadow,
  position,
  textAlign,
  fontSize,
  WidthProps,
  SpaceProps,
  ColorProps,
  TextAlignProps,
  BoxShadowProps
} from 'styled-system';

interface StyleProps {
  fadeIn: boolean;
}

export type BoxProps = WidthProps &
  SpaceProps &
  ColorProps &
  TextAlignProps &
  BoxShadowProps &
  StyleProps &
  React.HTMLProps<HTMLDivElement>;

const foo = keyframes`
  from {
    opacity: 0;
  }

  to {
    opacity: 1;
  }
`;

const Box = styled<BoxProps, any>('div')`
  animation: ${props => (props.fadeIn && `${foo} .4s linear`)};
  ${width}
  ${space}
  ${textAlign}
  ${color}
  ${top}
  ${fontSize}
  ${position}
  ${boxShadow}
`;

export default Box;
