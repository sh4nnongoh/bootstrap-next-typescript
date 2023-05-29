import clsx from 'clsx';
import { FC, ReactNode } from 'react';
const GlobalNavSectionLayout: FC<{ hide: boolean, children: ReactNode }> = ({ hide, children }) => (
  <div
    className={clsx('overflow-y-auto lg:static lg:block', {
      'fixed inset-x-0 bottom-0 top-14 mt-px bg-black': !hide,
      hidden: hide,
    })}
  >
    {children}
  </div>
);
export default GlobalNavSectionLayout;
