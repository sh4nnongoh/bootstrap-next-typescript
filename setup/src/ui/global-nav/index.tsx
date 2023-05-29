'use client';
import { useState } from 'react';
import Byline from '@/ui/byline';
import GlobalNavHeader from './global-nav-header';
import GlobalNavMenuButton from './global-nav-menu-button';
import GlobalNavLayout from './global-nav-layout';
import GlobalNavSectionLayout from './global-nav-section-layout';
import GlobalNavSection from './global-nav-section';
const GlobalNav = () => {
  const [isOpen, setIsOpen] = useState(false);
  const toggleNav = () => setIsOpen((prev) => !prev);
  const closeNav = () => setIsOpen(false);
  return (
    <GlobalNavLayout>
      <GlobalNavHeader onClick={closeNav} />
      <GlobalNavMenuButton show={isOpen} onClick={toggleNav} />
      <GlobalNavSectionLayout hide={!isOpen}>
        <GlobalNavSection onClick={closeNav} />
        <Byline className="absolute hidden sm:block" />
      </GlobalNavSectionLayout>
    </GlobalNavLayout>
  );
};
export default GlobalNav;
