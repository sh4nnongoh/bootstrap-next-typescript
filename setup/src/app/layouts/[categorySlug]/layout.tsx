import { getCategories, getCategory } from '@/app/api/categories/getCategories';
import ClickCounter from '@/ui/click-counter';
import TabGroup from '@/ui/tab-group';
const Layout = async ({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { categorySlug: string };
}) => {
  const { categorySlug } = await params;
  const category = await getCategory({ slug: categorySlug });
  const categories = await getCategories({ parent: categorySlug });
  return (
    <div className="space-y-9">
      <div className="flex justify-between">
        <TabGroup
          path={`/layouts/${category.slug}`}
          items={[
            {
              text: 'All',
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
