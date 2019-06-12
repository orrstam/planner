import * as React from 'react';
import styled from 'styled-components';
import {
  width,
  space,
  color,
  top,
  boxShadow,
  position,
  WidthProps,
  SpaceProps,
  ColorProps,
  BoxShadowProps
} from 'styled-system';

export type BoxProps = WidthProps &
  SpaceProps &
  ColorProps &
  BoxShadowProps &
  React.HTMLProps<HTMLDivElement>;

const Box = styled<BoxProps, any>('div')`
  ${width}
  ${space}
  ${color}
  ${top}
  ${position}
  ${boxShadow}
`;

export default Box;
