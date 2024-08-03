'use client';
import clsx from 'clsx';
import { useSearchParams } from 'next/navigation';
import { Fragment } from 'react';
const classNames = clsx('text-gray-100', {
  'animate-[highlight_1s_ease-in-out_1]': process.env.NODE_ENV === 'development',
});
const BreadcrumbsSearchParams = () => {
  const searchParams = useSearchParams()!;
  return searchParams.toString().length !== 0 ? (
    <div className="px-2 text-gray-500">
      <span>?</span>
      {Array.from(searchParams.entries()).map(([key, value], index) => (
        <Fragment key={key}>
          {index !== 0 ? <span>&</span> : null}
          <span className="px-1">
            <span
              key={key}
              className={classNames}
            >
              {key}
            </span>
            <span>=</span>
            <span
              key={value}
              className={classNames}
            >
              {value}
            </span>
          </span>
        </Fragment>
      ))}
    </div>
  ) : null;
};
export default BreadcrumbsSearchParams;
