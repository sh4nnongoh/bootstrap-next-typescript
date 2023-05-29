import { FC, ReactNode } from 'react';
const BreadcrumbsLayout: FC<{ children: ReactNode }> = ({ children }) => (
  <div className="flex items-center gap-x-2 p-3.5 lg:px-5 lg:py-3">
    <div className="flex gap-x-1 text-sm font-medium">
      {children}
    </div>
  </div>
);
export default BreadcrumbsLayout;
