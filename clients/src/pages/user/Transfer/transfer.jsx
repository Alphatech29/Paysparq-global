import React, { useState } from "react";
import { Button } from "flowbite-react";
import { NavLink } from "react-router-dom";
import Paysparq from "../Transfer/paysparq";

function Transfer() {
  const [openModal, setOpenModal] = useState(false); 

  return (
    <div className="flex flex-col  gap-4 items-start w-full bg-pay p-5 h-dvh shadow-md shadow-primary-600/50 rounded-lg">
      <NavLink to="/user/transfer/others">
        <div className="w-[70%] border-primary-600/50 border rounded-md px-3 py-3 cursor-pointer">
          <h1 className="text-lg font-interSB">Transfer to Bank Account</h1>
          <p className="text-sm">
            Transfer funds seamlessly from your Paysparq balance to one or multiple bank accounts instantly.
          </p>
        </div>
      </NavLink>

      <div
        className="w-[50%] border-primary-600/50 border rounded-md px-3 py-3 cursor-pointer"
        onClick={() => setOpenModal(true)} 
      >
        <h1 className="text-lg font-interSB">Transfer to Paysparq</h1>
        <p className="text-sm">
          Send money in Naira from one Paysparq account to another instantly using a account number.
        </p>
      </div>

      
      <Paysparq openModal={openModal} setOpenModal={setOpenModal} />
    </div>
  );
}

export default Transfer;
