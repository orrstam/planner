import * as React from 'react';
import styled from 'styled-components'
import {
  WidthProps,
  SpaceProps,
  ColorProps,
  BoxShadowProps
} from 'styled-system';

export type ButtonProps = WidthProps
  & SpaceProps
  & ColorProps
  & BoxShadowProps
  & React.HTMLProps<HTMLDivElement>;

const Button = styled<ButtonProps, any>('button')`
  border: 1px solid #ccc;
  padding: 18px 25px;
  border-radius: 0;
  margin-top: 15px;
  border: none;
  box-shadow: 1px 4px 15px -2px #ccc;
  font-size: 16px;
  cursor: pointer;
  width: 100%;
  background-color: rgba(226,125,96,1);
  color: #FFF;
  font-weight: 900;
  letter-spacing: 0.07em;
`;

export default Button