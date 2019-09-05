import * as React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import {
  color,
  space,
  SpaceProps,
  ColorProps,
} from 'styled-system';

export type LinkProps = SpaceProps
  & ColorProps
  & React.HTMLProps<HTMLInputElement>;

const InternalLink = styled<LinkProps, any>(Link)`
  text-decoration: none;
  ${color}
  ${space}
  :hover {
    opacity: 0.85;
  }
`;

export default InternalLink