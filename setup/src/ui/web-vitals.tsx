'use client';
import { useReportWebVitals } from 'next/web-vitals';
import { FC } from 'react';
import { usePathname } from 'next/navigation';
const WebVitals: FC = () => {
  const pathname = usePathname();
  useReportWebVitals((metric) => {
    console.log({ ...metric, pathname });
  });
  return null;
};
export default WebVitals;
