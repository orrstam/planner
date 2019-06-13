import * as React from 'react';
import styled from 'styled-components';
import {
  flexDirection,
  width,
  height,
  minHeight,
  FlexDirectionProps,
  justifyContent,
  justifySelf,
  alignSelf,
  color,
  space,
  flex,
  WidthProps,
  JustifyContentProps,
  SpaceProps,
  ColorProps,
  HeightProps,
  FlexProps
} from 'styled-system';

export type FlexProps = FlexDirectionProps &
  WidthProps &
  ColorProps &
  HeightProps &
  JustifyContentProps &
  SpaceProps &
  FlexProps &
  React.HTMLProps<HTMLDivElement>;

const Flex = styled<FlexProps, any>('div')`
  display: flex;
  ${flex}
  ${flexDirection}
  ${justifyContent}
  ${justifySelf}
  ${alignSelf}
  ${space}
  ${width}
  ${height}
  ${minHeight}
  ${color}
`;

export default Flex;
