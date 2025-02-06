import React from 'react';
import { Outlet } from 'react-router-dom';

const GiftCardOutlet = () => {
  return (
    <div className="flex flex-col  gap-4 items-start w-full bg-pay p-5 h-auto mb-5 shadow-md shadow-primary-600/50 rounded-lg">
    <h1 className='text-xl font-semibold'>Gift Cards</h1>
    <Outlet/>
    </div>
  );
};

export default GiftCardOutlet;
