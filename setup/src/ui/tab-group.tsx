import Tab from '@/ui/tab';
export type Item = {
  text: string;
  slug?: string;
  segment?: string;
};
const TabGroup = ({ path, items }: { path: string; items: Item[] }) => (
  <div className="flex flex-wrap items-center gap-2">
    {items.map((item) => (
      <Tab key={path + item.slug} item={item} path={path} />
    ))}
  </div>
);
export default TabGroup;
