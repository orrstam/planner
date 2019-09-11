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
  borders,
  WidthProps,
  SpaceProps,
  ColorProps,
  TextAlignProps,
  BoxShadowProps,
  BorderProps
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
  BorderProps &
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
  ${borders}
`;

export default Box;
