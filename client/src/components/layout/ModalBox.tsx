import * as React from 'react';
import styled from 'styled-components'
import {
  width,
  space,
  color,
  WidthProps,
  SpaceProps,
  ColorProps
} from 'styled-system';

export type ModalBoxProps = WidthProps
  & SpaceProps
  & ColorProps
  & React.HTMLProps<HTMLDivElement>;

const ModalBox = styled<ModalBoxProps, any>('div')`
  ${width}
  ${space}
  ${color}
`;

export default ModalBox