import * as React from 'react';
import styled from 'styled-components'
import {
  space,
  bgColor,
  size,
  border,
  SpaceProps,
  ColorProps,
  BorderProps
} from 'styled-system';

export type CircleProps = SpaceProps
  & ColorProps
  & React.HTMLProps<HTMLDivElement>
  & BorderProps;

const Circle = styled<CircleProps, any>('div')`
  position: relative;
  border-radius: 9999px;
  display: flex;
  align-items: center;
  justify-content: center;
  ${space}
  ${bgColor}
  ${size}
  ${border}
`;

export default Circle