import * as React from 'react';
import styled from 'styled-components';
import { space, size, border, SpaceProps, BorderProps } from 'styled-system';

export type LogoProps = SpaceProps &
  React.HTMLProps<HTMLDivElement> &
  BorderProps;

const Logo = styled<LogoProps, any>('img')`
  width: 150px;
  ${space}
  ${size}
  ${border}
`;

export default Logo;
