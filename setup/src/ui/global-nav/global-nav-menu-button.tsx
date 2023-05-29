import { FC } from 'react';
import { XMarkIcon, Bars3Icon } from '@heroicons/react/20/solid';
const GlobalNavMenuButton: FC<{ show: boolean, onClick: VoidFunction }> = ({ show, onClick }) => (
  <button
    type="button"
    className="group absolute right-0 top-0 flex h-14 items-center gap-x-2 px-4 lg:hidden"
    onClick={onClick}
  >
    <div className="font-medium text-gray-100 group-hover:text-gray-400">
      Menu
    </div>
    {show ? (
      <XMarkIcon className="block w-6 text-gray-400" />
    ) : (
      <Bars3Icon className="block w-6 text-gray-400" />
    )}
  </button>
);
export default GlobalNavMenuButton;
