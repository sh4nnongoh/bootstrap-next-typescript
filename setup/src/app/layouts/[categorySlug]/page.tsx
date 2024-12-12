import { getCategory } from '@/app/api/categories/getCategories';
import SkeletonCard from '@/ui/skeleton-card';
const Page = async ({
  params,
}: {
  params: { categorySlug: string };
}) => {
  const { categorySlug } = await params;
  const category = await getCategory({ slug: categorySlug });
  return (
    <div className="space-y-4">
      <h1 className="text-xl font-medium text-gray-400/80">
        All
        {' '}
        {category.name}
      </h1>
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        {Array.from({ length: 9 }).map((_, i) => (
          // eslint-disable-next-line react/no-array-index-key
          <SkeletonCard key={i} isLoading={false} />
        ))}
      </div>
    </div>
  );
};
export default Page;
