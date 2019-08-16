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
  alignItems,
  color,
  space,
  fontSize,
  flex,
  borders,
  WidthProps,
  JustifyContentProps,
  AlignItemsProps,
  SpaceProps,
  ColorProps,
  HeightProps,
  FlexProps,
  BordersProps
} from 'styled-system';

export type FlexProps = FlexDirectionProps &
  WidthProps &
  ColorProps &
  HeightProps &
  JustifyContentProps &
  AlignItemsProps &
  SpaceProps &
  FlexProps &
  BordersProps &
  React.HTMLProps<HTMLDivElement>;

const Flex = styled<FlexProps, any>('div')`
  display: flex;
  ${flex}
  ${flexDirection}
  ${justifyContent}
  ${justifySelf}
  ${alignSelf}
  ${alignItems}
  ${space}
  ${fontSize}
  ${width}
  ${height}
  ${minHeight}
  ${color}
  ${borders}
`;

export default Flex;
