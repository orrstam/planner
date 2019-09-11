import * as React from 'react';
import styled from 'styled-components';
import { color, ColorProps } from 'styled-system';

export type SpanProps = ColorProps & React.HTMLProps<HTMLDivElement>;

const Span = styled<SpanProps, any>('span')`
  ${color}
`;

export { Span };
