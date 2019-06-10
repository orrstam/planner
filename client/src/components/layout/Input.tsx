import * as React from 'react';
import styled from 'styled-components'
import {
  space,
  bgColor,
  size,
  width,
  SpaceProps,
  ColorProps,
  WidthProps,
} from 'styled-system';

export type InputProps = SpaceProps
  & ColorProps
  & React.HTMLProps<HTMLInputElement>
  & WidthProps;

const Input = styled<InputProps, any>('input')`
  padding: 15px;
  font-size: 16px;
  border: none;
  box-shadow: 1px 4px 15px -2px #ccc;
  ${space}
  ${bgColor}
  ${size}
  ${width}
`;

export default Input