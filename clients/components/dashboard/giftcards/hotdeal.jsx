import React, { useEffect, useState } from 'react';

const Hotdeal = () => {
  const [cardData, setCardData] = useState([]);

  useEffect(() => {
    const fetchCardData = async () => {
      try {
        const response = await fetch('/api/card-details');
        const data = await response.json();
        // Ensure the filtering matches the backend response ('United State' instead of 'USA')
        const usaCards = data.allData.filter(card => card.country === 'United State');
        setCardData(usaCards);
      } catch (error) {
        console.error('Error fetching card data:', error);
      }
    };

    fetchCardData();
  }, []);

  return (
    <div className='shadow-md w-full shadow-primary-600/50 rounded-lg bg-pay px-3 py-3'>
      <h1 className='text-base font-interB'>Hottest Cards 🔥</h1>
      <div className='mt-3 flex gap-3 flex-wrap'>
        {/* Only map out the first 4 cards from the USA */}
        {cardData.slice(0, 4).map((card) => (
          <div key={card.exchange_rate_id} className='flex rounded-lg items-center border border-primary-600/50 px-3 py-2 w-[24%]'>
            <div className='pr-3'>
              {/* Use a fallback image if avatar_url is not available */}
              <img src={card.avatar_url || '/default-avatar.png'} className='rounded-lg w-10 h-8' alt={card.card_name} />
            </div>
            <div className='flex flex-col'>
              <h4 className='text-base'>{card.card_name}</h4>
              <span className='text-sm text-teal-500'>
                <strong>{card.country_currency}1 = {card.exchange_rate_naira}</strong>
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Hotdeal;
