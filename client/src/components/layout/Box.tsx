import * as React from 'react';
import styled from 'styled-components';
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

export type BoxProps = WidthProps &
  SpaceProps &
  ColorProps &
  TextAlignProps &
  BoxShadowProps &
  React.HTMLProps<HTMLDivElement>;

const Box = styled<BoxProps, any>('div')`
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
