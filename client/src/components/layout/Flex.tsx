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
  boxShadow,
  WidthProps,
  JustifyContentProps,
  AlignItemsProps,
  SpaceProps,
  ColorProps,
  HeightProps,
  FlexProps,
  BordersProps,
  BoxShadowProps
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
  BoxShadowProps &
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
  ${boxShadow}
`;

export default Flex;
