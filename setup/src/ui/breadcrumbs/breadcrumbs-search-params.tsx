'use client';
import { useSearchParams } from 'next/navigation';
import { Fragment } from 'react';
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
              className="animate-[highlight_1s_ease-in-out_1] text-gray-100"
            >
              {key}
            </span>
            <span>=</span>
            <span
              key={value}
              className="animate-[highlight_1s_ease-in-out_1] text-gray-100"
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
