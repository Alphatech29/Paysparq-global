import React from 'react';
import { MdCardGiftcard } from "react-icons/md";
import { CiCalculator2 } from "react-icons/ci";
import { NavLink } from 'react-router-dom';
import Swal from 'sweetalert2';
import Hotdeal from '../../../../components/dashboard/giftcards/hotdeal';
import GiftcardHistory from '../../../../components/dashboard/giftcards/giftcardHistory';

const GiftCard = () => {
  const handleComingSoon = (e) => {
    e.preventDefault();
    Swal.fire({
      title: "Coming Soon!",
      text: "This feature is not available yet. Stay tuned!",
      icon: "info",
      confirmButtonColor: "#F66B04",
      confirmButtonText: "Okay",
    });
  };

  return (
    <div className="flex flex-col gap-4 items-start">
      <div className="flex gap-4">
        <div className="w-[40%]" onClick={handleComingSoon}>
          <div className="shadow-md shadow-primary-600/50 rounded-lg px-3 py-3 hover:bg-primary-600/30 cursor-pointer">
            <span><MdCardGiftcard className="bg-primary-600/45 rounded-full p-2" fontSize={40} /></span>
            <h1 className="text-xl font-interB mt-3">Buy Gift Cards</h1>
            <p className="text-sm">Purchase and receive your gift card instantly for easy gifting.</p>
          </div>
        </div>

        {/* Sell Gift Cards */}
        <NavLink to="/user/giftcard/sell-card" className="w-[40%]">
          <div className="shadow-md shadow-primary-600/50 rounded-lg px-3 py-3 hover:bg-primary-600/30">
            <span><MdCardGiftcard className="bg-primary-600/45 rounded-full p-2" fontSize={40} /></span>
            <h1 className="text-xl font-interB mt-3">Sell Gift Cards</h1>
            <p className="text-sm">Sell gift cards easily and securely, offering buyers the perfect choice for any occasion.</p>
          </div>
        </NavLink>

        {/* Rate Calculator */}
        <div className="w-[40%] shadow-md shadow-primary-600/50 rounded-lg px-3 py-3 hover:bg-primary-600/30">
          <span><CiCalculator2 className="bg-primary-600/45 rounded-full p-2" fontSize={40} /></span>
          <h1 className="text-xl font-interB mt-3">Rate Calculator</h1>
          <p className="text-sm">Calculate rates easily and accurately with our rate calculator.</p>
        </div>
      </div>

      {/* Other Components */}
      <Hotdeal />
      <GiftcardHistory />
    </div>
  );
}

export default GiftCard;
