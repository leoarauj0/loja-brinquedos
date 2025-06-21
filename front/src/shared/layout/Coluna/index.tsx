import { Col, ColProps } from 'antd';
import React from 'react';

interface Props extends ColProps{
  children: React.ReactNode;
}

export function Coluna({ children, ...rest }: Props ) {
  return (
    <Col {...rest}>
      {children}
    </Col>
  );
}