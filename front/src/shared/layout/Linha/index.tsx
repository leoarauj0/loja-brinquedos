import { RowProps } from 'antd';
import React from 'react';

import {
  Container
} from './styles';

interface Props extends RowProps{
  children: React.ReactNode;
}

export function Linha({children, ...rest} : Props) {
  return (
    <Container {...rest}>
      {children}
    </Container>
  );
}