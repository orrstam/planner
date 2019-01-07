import * as React from 'react';
import styled from 'styled-components'
import {
  flexDirection,
  width,
  height,
  minHeight,
  FlexDirectionProps,
  justifyContent,
  justifySelf,
  color,
  space,
  WidthProps,
  JustifyContentProps,
  SpaceProps,
  ColorProps,
  HeightProps
} from 'styled-system';

export type FlexProps = & FlexDirectionProps
  & WidthProps
  & ColorProps
  & HeightProps
  & JustifyContentProps
  & SpaceProps
  & React.HTMLProps<HTMLDivElement>;

const Flex = styled<FlexProps, any>('div')`
  display: flex;
  ${flexDirection}
  ${justifyContent}
  ${justifySelf}
  ${space}
  ${width}
  ${height}
  ${minHeight}
  ${color}
`;

export default Flex