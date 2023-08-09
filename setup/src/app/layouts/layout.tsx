import React from 'react';
import ClickCounter from '@/ui/click-counter';
import TabGroup from '@/ui/tab-group';
import { getCategories } from '@/app/api/categories/getCategories';
export const metadata = {
  title: 'Nested Layouts',
};
const Layout = async ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const categories = await getCategories();
  return (
    <div className="space-y-9">
      <div className="flex justify-between">
        <TabGroup
          path="/layouts"
          items={[
            {
              text: 'Home',
            },
            ...categories.map((x) => ({
              text: x.name,
              slug: x.slug,
            })),
          ]}
        />
        <div className="self-start">
          <ClickCounter />
        </div>
      </div>
      <div>{children}</div>
    </div>
  );
};
export default Layout;
