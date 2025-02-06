import React from 'react';
import { MdCardGiftcard } from "react-icons/md";
import { CiCalculator2 } from "react-icons/ci";
import { NavLink} from 'react-router-dom'
import Hotdeal from '../../../../components/dashboard/giftcards/hotdeal';
import GiftcardHistory from '../../../../components/dashboard/giftcards/giftcardHistory';



const GiftCard = () => {
  return (
    <div className="flex flex-col  gap-4 items-start">
     <div className='flex gap-4'>
     <NavLink to="/user/giftcard/buy-card" className='w-[40%]'>
     <div className='shadow-md shadow-primary-600/50 rounded-lg px-3 py-3 hover:bg-primary-600/30'>
        <div><span><MdCardGiftcard  className='bg-primary-600/45 rounded-full p-2' fontSize={40}/></span>
        <h1 className='text-xl font-interB mt-3'>Buy Gift Cards</h1>
        <p className='text-sm'>Purchase and receive your gift card instantly for easy gifting.</p>
        </div>
      </div>
     </NavLink>
     <NavLink to="/user/giftcard/sell-card" className='w-[40%]'>
     <div className=' shadow-md shadow-primary-600/50 rounded-lg px-3 py-3 hover:bg-primary-600/30'>
        <div><span><MdCardGiftcard  className='bg-primary-600/45 rounded-full p-2' fontSize={40}/></span>
        <h1 className='text-xl font-interB mt-3'>Sell Gift Cards</h1>
        <p className='text-sm'>Sell gift cards easily and securely, offering buyers the perfect choice for any occasion.</p>
        </div>
      </div>
     </NavLink>
      <div className='w-[40%] shadow-md shadow-primary-600/50 rounded-lg px-3 py-3 hover:bg-primary-600/30'>
        <div><span><CiCalculator2  className='bg-primary-600/45 rounded-full p-2' fontSize={40}/></span>
        <h1 className='text-xl font-interB mt-3'>Rate Calculator</h1>
        <p className='text-sm'>Calculate rates easily and accurately with our rate calculator.</p>
        </div>
      </div>
     </div>
     

<Hotdeal/>

    <GiftcardHistory/>
    </div>
  );
}

export default GiftCard;
