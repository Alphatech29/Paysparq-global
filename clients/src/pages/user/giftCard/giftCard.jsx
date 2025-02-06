import React from 'react';
import { MdCardGiftcard } from "react-icons/md";
import { CiCalculator2 } from "react-icons/ci";
import { Table } from "flowbite-react";
import { NavLink} from 'react-router-dom'
import Hotdeal from '../../../../components/dashboard/giftcards/hotdeal';



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

     <div className="overflow-x-auto shadow-md w-full shadow-primary-600/50 mb-6 rounded-lg bg-pay">
      <h1 className="py-2 text-lg pl-2 text-secondary">Transaction History</h1>
      <Table hoverable className="bg-pay">
        <Table.Head className="text-secondary bg-pay">
          <Table.HeadCell className="bg-pay">Giftcard Name/Sub category</Table.HeadCell>
          <Table.HeadCell className="text-secondary bg-pay">Quantity (Rate)</Table.HeadCell>
          <Table.HeadCell className="text-secondary bg-pay">Amount (₦)</Table.HeadCell>
          <Table.HeadCell className="text-secondary bg-pay">Trade Type</Table.HeadCell>
          <Table.HeadCell className="text-secondary bg-pay">Status</Table.HeadCell>
          <Table.HeadCell className="text-secondary bg-pay">Date</Table.HeadCell>
        </Table.Head>
        <Table.Body className="divide-y">   
              <Table.Row className="text-secondary">
                <Table.Cell></Table.Cell>
                <Table.Cell>$100(2)</Table.Cell>
                <Table.Cell>200,000.00</Table.Cell>
                <Table.Cell>Sell card</Table.Cell>
                <Table.Cell>success</Table.Cell>
                <Table.Cell>Feb 3, 2025 • 8:16 AM</Table.Cell>
              </Table.Row>
        </Table.Body>
      </Table>
    </div>
    </div>
  );
}

export default GiftCard;
