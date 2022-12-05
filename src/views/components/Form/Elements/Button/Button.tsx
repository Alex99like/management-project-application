import React, { FC, PropsWithChildren } from 'react';
import { IButton } from '../elements.props';

export const Button: FC<PropsWithChildren<IButton>> = ({ children, ...rest }) => {
  return <button {...rest}>{children}</button>;
};
