'use client';
import clsx from 'clsx';
import Link from 'next/link';
import { useSelectedLayoutSegment } from 'next/navigation';
import type { Item } from '@/ui/tab-group';
const Tab = ({ path, item }: { path: string; item: Item }) => {
  const segment = useSelectedLayoutSegment();
  const href = item.slug ? `${path}/${item.slug}` : path;
  // Example home pages e.g. `/layouts`
  // Nested pages e.g. `/layouts/electronics`
  const isActive = (!item.slug && segment === null)
    || segment === item.segment
    || segment === item.slug;
  return (
    <Link
      href={href}
      className={clsx('rounded-lg px-3 py-1 text-sm font-medium', {
        'bg-gray-700 text-gray-100 hover:bg-gray-500 hover:text-white':
          !isActive,
        'bg-vercel-blue text-white': isActive,
      })}
    >
      {item.text}
    </Link>
  );
};
export default Tab;
