import React from 'react';
import Boundary from '@/ui/boundary';
const Template = ({ children }: { children: React.ReactNode }) => (
  <Boundary
    labels={['children']}
    size="default"
    color="default"
    animateRerendering
  >
    {children}
  </Boundary>
);
export default Template;
