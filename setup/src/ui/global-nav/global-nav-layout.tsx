import clsx from 'clsx';
import { FC, ReactNode } from 'react';
const GlobalNavLayout: FC<{ children: ReactNode }> = ({ children }) => (
  <div className={
    clsx(
      'fixed',
      'top-0',
      'z-10',
      'flex',
      'w-full',
      'flex-col',
      'border-b',
      'border-gray-800',
      'bg-black',
      'lg:bottom-0',
      'lg:z-auto',
      'lg:w-72',
      'lg:border-b-0',
      'lg:border-r',
      'lg:border-gray-800',
    )
  }
  >
    {children}
  </div>
);
export default GlobalNavLayout;
