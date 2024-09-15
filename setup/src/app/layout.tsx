import './globals.css';
import Byline from '@/ui/byline';
import GlobalNav from '@/ui/global-nav';
import Breadcrumbs from '@/ui/breadcrumbs';
import { Metadata } from 'next';
import WebVitals from '@/ui/web-vitals';
export const metadata: Metadata = {
  title: {
    default: 'Next.js App Router',
    template: '%s | Next.js App Router',
  },
  description: `
  A playground to explore new Next.js App Router features such as nested layouts, 
  instant loading states, streaming, and component level data fetching.`,
};
const Layout = ({
  children,
}: {
  children: React.ReactNode;
}) => (
  <html lang="en" className="[color-scheme:dark]">
    <WebVitals />
    <body className="bg-gray-1100 overflow-y-scroll bg-[url('/grid.svg')] pb-36">
      <GlobalNav />
      <div className="lg:pl-72">
        <div className="mx-auto max-w-7xl space-y-8 px-2 pt-20 lg:py-8 lg:px-8">
          <div className="rounded-lg bg-vc-border-gradient p-px shadow-lg shadow-black/20">
            <div className="rounded-lg bg-black">
              <Breadcrumbs />
            </div>
          </div>
          <div className="rounded-lg bg-vc-border-gradient p-px shadow-lg shadow-black/20">
            <div className="rounded-lg bg-black p-3.5 lg:p-6">{children}</div>
          </div>
          <Byline className="fixed sm:hidden" />
        </div>
      </div>
    </body>
  </html>
);
export default Layout;
