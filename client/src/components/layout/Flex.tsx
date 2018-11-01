import * as React from 'react';
import styled from 'styled-components'
import {
  flexDirection,
  width,
  height,
  FlexDirectionProps,
  justifyContent,
  color,
  WidthProps,
  ColorProps,
  HeightProps
} from 'styled-system';

export type FlexProps = & FlexDirectionProps
  & WidthProps
  & ColorProps
  & HeightProps
  & React.HTMLProps<HTMLDivElement>;

const Flex = styled<FlexProps, any>('div')`
  display: flex;
  ${flexDirection}
  ${justifyContent}
  ${width}
  ${height}
  ${color}
`;

export default Flex