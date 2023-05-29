import { Suspense } from 'react';
import BreadcrumbsSearchParams from './breadcrumbs-search-params';
import BreadcrumbsPath from './breadcrumbs-path';
import BreadcrumbsRoot from './breadcrumbs-root';
import BreadcrumbsLayout from './breadcrumbs-layout';
const Breadcrumbs = () => (
  <BreadcrumbsLayout>
    <BreadcrumbsRoot />
    <BreadcrumbsPath />
    <Suspense>
      <BreadcrumbsSearchParams />
    </Suspense>
  </BreadcrumbsLayout>
);
export default Breadcrumbs;
