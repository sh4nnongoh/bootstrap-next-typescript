import { FC } from 'react';
import GlobalNavItem from './global-nav-item';
const tabs = [{
  name: 'some name',
  items: [{
    name: 'item',
    slug: 'slug',
  }],
}];
const GlobalNavSection: FC<{ onClick: VoidFunction }> = ({ onClick }) => (
  <nav className="space-y-6 px-2 py-5">
    {tabs.map((section) => (
      <div key={section.name}>
        <div className="mb-2 px-3 text-xs font-semibold uppercase tracking-wider text-gray-400/80">
          <div>{section.name}</div>
        </div>
        <div className="space-y-1">
          {section.items.map((item) => (
            <GlobalNavItem key={item.slug} item={item} onClick={onClick} />
          ))}
        </div>
      </div>
    ))}
  </nav>
);
export default GlobalNavSection;
