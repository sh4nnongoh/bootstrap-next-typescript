import clsx from 'clsx';
import React from 'react';
const Label = ({
  children,
  animateRerendering,
  color,
}: {
  children: React.ReactNode;
  animateRerendering: boolean;
  color: 'default' | 'pink' | 'blue' | 'violet' | 'cyan' | 'orange';
}) => (
  <div
    className={clsx('rounded-full px-1.5 shadow-[0_0_1px_3px_black]', {
      'bg-gray-800 text-gray-300': color === 'default',
      'bg-vercel-pink text-white': color === 'pink',
      'bg-vercel-blue text-white': color === 'blue',
      'bg-vercel-cyan text-white': color === 'cyan',
      'bg-vercel-violet text-violet-100': color === 'violet',
      'bg-vercel-orange text-white': color === 'orange',
      'animate-[highlight_1s_ease-in-out_1]': process.env.NODE_ENV === 'development' && animateRerendering,
    })}
  >
    {children}
  </div>
);
const Boundary = ({
  children,
  labels = ['children'],
  size = 'default',
  color = 'default',
  animateRerendering = true,
}: {
  children: React.ReactNode;
  labels: string[];
  size: 'small' | 'default';
  color: 'default' | 'pink' | 'blue' | 'violet' | 'cyan' | 'orange';
  animateRerendering: boolean;
}) => (
  <div
    className={clsx('relative rounded-lg border border-dashed', {
      'p-3 lg:p-5': size === 'small',
      'p-4 lg:p-9': size === 'default',
      'border-gray-700': color === 'default',
      'border-vercel-pink': color === 'pink',
      'border-vercel-blue': color === 'blue',
      'border-vercel-cyan': color === 'cyan',
      'border-vercel-violet': color === 'violet',
      'border-vercel-orange': color === 'orange',
      'animate-[rerender_1s_ease-in-out_1] text-vercel-pink':
        process.env.NODE_ENV === 'development' && animateRerendering,
    })}
  >
    <div
      className={clsx(
        'absolute -top-2.5 flex gap-x-1 text-[9px] uppercase leading-4 tracking-widest',
        {
          'left-3 lg:left-5': size === 'small',
          'left-4 lg:left-9': size === 'default',
        },
      )}
    >
      {labels.map((label) => (
        <Label
          key={label}
          color={color}
          animateRerendering={process.env.NODE_ENV === 'development' && animateRerendering}
        >
          {label}
        </Label>
      ))}
    </div>
    {children}
  </div>
);
export default Boundary;
