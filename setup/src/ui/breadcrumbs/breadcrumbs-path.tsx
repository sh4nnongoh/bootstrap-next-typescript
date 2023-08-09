'use client';
import { usePathname } from 'next/navigation';
import { FC, Fragment } from 'react';
const BreadcrumbsPath: FC = () => {
  const pathname = usePathname();
  if (!pathname || pathname === '/') {
    return null;
  }
  return (
    <>
      <span className="text-gray-600">/</span>
      {pathname
        .split('/')
        .slice(1)
        .map((segment) => (
          <Fragment key={segment}>
            <span>
              <span
                key={segment}
                className="animate-[highlight_1s_ease-in-out_1] rounded-full px-1.5 py-0.5 text-gray-100"
              >
                {segment}
              </span>
            </span>
            <span className="text-gray-600">/</span>
          </Fragment>
        ))}
    </>
  );
};
export default BreadcrumbsPath;
