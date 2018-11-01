import * as React from 'react';
import styled from 'styled-components'
import {
  width,
  space,
  color,
  WidthProps,
  SpaceProps,
  ColorProps
} from 'styled-system';

export type BoxProps = WidthProps
  & SpaceProps
  & ColorProps
  & React.HTMLProps<HTMLDivElement>;

const Box = styled<BoxProps, any>('div')`
  ${width}
  ${space}
  ${color}
`;

export default Box