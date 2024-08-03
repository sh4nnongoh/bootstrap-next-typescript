import clsx from 'clsx';
const skeletonClassName = clsx(
  'relative',
  'overflow-hidden',
  'before:absolute',
  'before:inset-0',
  'before:-translate-x-full',
  'before:bg-gradient-to-r',
  'before:from-transparent',
  'before:via-white/10',
  'before:to-transparent',
  { 'before:animate-[shimmer_1.5s_infinite]': process.env.NODE_ENV === 'development' },
);
const SkeletonCard = ({ isLoading }: { isLoading: boolean }) => (
  <div
    className={clsx('rounded-2xl bg-gray-900/80 p-4', {
      [skeletonClassName]: isLoading,
    })}
  >
    <div className="space-y-3">
      <div className="h-14 rounded-lg bg-gray-700" />
      <div className="h-3 w-11/12 rounded-lg bg-gray-700" />
      <div className="h-3 w-8/12 rounded-lg bg-gray-700" />
    </div>
  </div>
);
export default SkeletonCard;
