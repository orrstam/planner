import * as React from 'react';
import styled from 'styled-components';
import {
  color,
  space,
  size,
  width,
  SpaceProps,
  ColorProps,
  WidthProps,
} from 'styled-system';

export type LinkProps = SpaceProps
  & ColorProps
  & React.HTMLProps<HTMLInputElement>
  & WidthProps;

const StyledLink = styled<LinkProps, any>('a')`
  text-decoration: none;
  ${color}
  ${space}
  ${size}
  ${width}
  :hover {
    opacity: 0.85;
  }
`;

export default StyledLink