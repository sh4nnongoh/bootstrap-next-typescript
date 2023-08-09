import Boundary from '@/ui/boundary';
const NotFound = () => (
  <Boundary labels={['not-found.tsx']} color="pink" size="default" animateRerendering>
    <div className="space-y-4 text-vercel-pink">
      <h2 className="text-lg font-bold">Not Found</h2>
      <p className="text-sm">Could not find requested resource</p>
    </div>
  </Boundary>
);
export default NotFound;
