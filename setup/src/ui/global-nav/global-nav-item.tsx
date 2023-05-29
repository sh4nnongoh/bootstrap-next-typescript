import Link from 'next/link';
import { useSelectedLayoutSegment } from 'next/navigation';
import clsx from 'clsx';
const GlobalNavItem = ({
  item,
  onClick,
}: {
  item: { name: string, slug: string };
  onClick: () => false | void;
}) => {
  const segment = useSelectedLayoutSegment();
  const isActive = item.slug === segment;
  return (
    <Link
      onClick={onClick}
      href={`/${item.slug}`}
      className={clsx(
        'block rounded-md px-3 py-2 text-sm font-medium hover:text-gray-300',
        {
          'text-gray-400 hover:bg-gray-800': !isActive,
          'text-white': isActive,
        },
      )}
    >
      {item.name}
    </Link>
  );
};
export default GlobalNavItem;
