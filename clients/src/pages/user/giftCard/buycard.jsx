import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { MdArrowBackIos } from "react-icons/md";
import { Label, Select, TextInput, Button } from "flowbite-react";


const BuyCard = () => {
  const [selectedCard, setSelectedCard] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedAmount, setSelectedAmount] = useState("");

  // Handle form submission (if needed for further logic)
  const handleSubmit = (e) => {
    e.preventDefault();
    // Add any form submission logic here
    console.log({
      selectedCard,
      selectedCategory,
      cardAmount,
    });
  };

  return (
    <div>
      <div>
        <span>
          <NavLink to="/user/giftcard/" className="flex items-center text-base">
            <MdArrowBackIos /> Back
          </NavLink>
        </span>
      </div>
      <form className="flex w-[50%] flex-col" onSubmit={handleSubmit}>
        
        {/* Select Card */}
        <div>
          <div className="block">
            <Label htmlFor="selectcard" value="Select Card" />
          </div>
          <Select 
            id="selectcard" 
            sizing="sm" 
            value={selectedCard} 
            onChange={(e) => setSelectedCard(e.target.value)}
          >
            <option value="" disabled>Select a card</option>
            <option value="amazon">Amazon</option>
            <option value="itunes">iTunes</option>
            <option value="google_play">Google Play</option>
            <option value="steam">Steam</option>
            <option value="ebay">eBay</option>
          </Select>
        </div>
      
        {/* Card Category */}
        <div>
          <div className="block">
            <Label htmlFor="cardCategory" value="Card Category" />
          </div>
          <Select 
            id="cardCategory" 
            sizing="md" 
            value={selectedCategory} 
            onChange={(e) => setSelectedCategory(e.target.value)}
          >
            <option value="" disabled>Select a category</option>
            <option value="usa">USA</option>
            <option value="uk">UK</option>
            <option value="canada">Canada</option>
            <option value="australia">Australia</option>
            <option value="europe">Europe</option>
          </Select>
        </div>
      
        {/* Gift Card Amount */}
        <div>
          <div className="block">
            <Label htmlFor="amount" value="How much do you need?" />
          </div>
          <Select 
            id="amount" 
            sizing="md" 
            value={selectedAmount} 
            onChange={(e) => setSelectedAmount(e.target.value)}
          >
            <option value="" disabled>Select Amount</option>
            <option value="">2</option>
            <option value="">3</option>
            <option value="">4</option>
            <option value="">5</option>
            <option value="">10</option>
          </Select>
        </div>
      
        {/* Amount to Receive */}
        <div>
          <span className="text-sm"><strong>Amount you pay in Naira</strong></span>
          <div className="flex justify-center items-center border border-primary-600/50 py-10 px-10 mt-2 rounded-lg">
            <span className="text-xl">₦ 0.00</span>
          </div>
        </div>
      
      

        <div className='mt-4'>
          <p className='text-sm flex flex-col'>
          Please note that gift cards are exclusively for purchasing goods, services, and subscriptions on the respective brand platforms. Ensure that the item you're ordering is what you need before proceeding. Refunds are not possible once the code is delivered. If you need guidance on redeeming your gift card, feel free to contact us.
          </p>
        </div>

        {/* Submit Button */}
        <Button type="submit" className="bg-secondary mt-5">Complete Order</Button>
      </form>
    </div>
  );
};

export default BuyCard;
