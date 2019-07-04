import * as React from 'react';
import styled from 'styled-components';
import { WidthProps, SpaceProps, ColorProps } from 'styled-system';

export type ProfileWrapperProps = WidthProps &
  SpaceProps &
  ColorProps &
  React.HTMLProps<HTMLDivElement>;

const ProfileWrapper = styled<ProfileWrapperProps, any>('div')`
  position: relative;
  max-width: 70px;
  overflow: hidden;
  border-radius: 50%;
`;

export default ProfileWrapper;
