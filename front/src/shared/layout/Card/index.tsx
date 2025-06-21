import { CardProps } from 'antd';
import React, { ReactNode } from 'react';

import {
  Container
} from './styles';

interface PropsCard extends CardProps {
  children: ReactNode
}

export function Card({ children, ...rest}: PropsCard) {
  return (
    <Container {...rest}>
      {children}
    </Container>
  );
}