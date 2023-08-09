import NextLogo from '@/ui/next-logo';
import Link from 'next/link';
import { FC } from 'react';
const GlobalNavHeader: FC<{ onClick: VoidFunction }> = ({ onClick }) => (
  <div className="flex h-14 items-center py-4 px-4 lg:h-auto">
    <Link
      href="/"
      className="group flex w-full items-center gap-x-2.5"
      onClick={onClick}
    >
      <div className="h-7 w-7 rounded-full border border-white/30 group-hover:border-white/50">
        <NextLogo />
      </div>
      <h3 className="font-semibold tracking-wide text-gray-400 group-hover:text-gray-50">
        App Router
      </h3>
    </Link>
  </div>
);
export default GlobalNavHeader;
