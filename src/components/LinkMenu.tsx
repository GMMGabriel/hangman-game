import { ReactNode } from 'react'
import { Link } from 'react-router-dom';

import '../styles/button.scss';

type ButtonProps = {
  children: ReactNode;
  to: string;
};

export function LinkMenu({ children, to, ...props }: ButtonProps) {
  return (
    <Link
      to={to}
      className="link-menu"
      {...props}
    >{children}</Link>
  )
}