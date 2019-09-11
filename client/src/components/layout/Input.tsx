import * as React from 'react';
import styled from 'styled-components'
import {
  space,
  bgColor,
  color,
  size,
  fontSize,
  width,
  SpaceProps,
  ColorProps,
  WidthProps,
  FontSizeProps
} from 'styled-system';

interface CustomInputProps {
  edit?: boolean;
}

export type InputProps = SpaceProps
  & ColorProps
  & WidthProps
  & CustomInputProps
  & FontSizeProps
  & React.HTMLProps<HTMLInputElement>;

const Input = styled<InputProps, any>('input')`
  border: none;
  border-bottom: ${props => props.edit && '1px solid #ccc'};
  box-shadow: ${props => props.edit ? '' : '1px 4px 15px -2px #ccc'};
  ${color}
  ${fontSize}
  ${space}
  ${bgColor}
  ${size}
  ${width}
`;

export default Input