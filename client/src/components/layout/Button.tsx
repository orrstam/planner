import * as React from 'react';
import styled from 'styled-components';
import {
  color,
  space,
  WidthProps,
  SpaceProps,
  ColorProps,
  BoxShadowProps
} from 'styled-system';

export type ButtonProps = WidthProps &
  SpaceProps &
  ColorProps &
  BoxShadowProps &
  SpaceProps &
  React.HTMLProps<HTMLDivElement>;

const Button = styled<ButtonProps, any>('button')`
  border: 1px solid #ccc;
  border-radius: 0;
  margin-top: 15px;
  border: none;
  font-size: 16px;
  cursor: pointer;
  width: 100%;
  background-color: rgba(226, 125, 96, 1);
  color: #fff;
  font-weight: 900;
  letter-spacing: 0.07em;
  ${color}
  ${space}
`;

export default Button;
