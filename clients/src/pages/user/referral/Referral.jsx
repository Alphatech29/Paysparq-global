import React, { useState } from "react";
import { FaGift } from "react-icons/fa6";
import { HiOutlineArrowRight } from "react-icons/hi";
import { FaUsers } from "react-icons/fa6";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import Button from '@mui/material/Button';
import { MdOutlineContentCopy } from "react-icons/md";
import DashboardLogic from "../../../../components/dashboard/dashboard";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Referral = () => {
  const { userData } = DashboardLogic();
  const [showReward, setShowReward] = useState(false);
    const copyReferralLink = () => {
      const link = `https://paysparq.com/!?ref=pftay35`;
      navigator.clipboard.writeText(link)
        .then(() => {
          toast.success('Referral Link copied to clipboard!');
        })
        .catch(() => {
          toast.error('Failed to Referral Link. Please try again.');
        });
    };

  return (
    <div className="flex flex-col mb-5 gap-4">
      <div className="bg-pay rounded-lg shadow-md shadow-primary-600/40 px-4 py-8 flex flex-col gap-1">
       <div className="flex gap-1">
       <div className="w-1/3  border-r-2 border-primary-600/50 px-3 py-3">
          <div className="flex justify-start items-center gap-5 rounded-lg">
            <span className="text-lg bg-primary-600/50 p-2 rounded-full">
              <FaGift />
            </span>
            <span className="text-base">Reward</span>
          </div>
          <div className="flex flex-col mt-4">
            <span className="text-lg font-bold">
              {showReward ? `$${userData?.reward || "0.00"}` : "******"}
            </span>
            <div className="flex justify-start items-start gap-4">
              <span className="text-sm">Total Balance</span>

              <div
                className="text-primary-600 text-sm flex cursor-pointer"
                onClick={() => setShowReward(!showReward)}
              >
                {showReward ? <VisibilityOff /> : <Visibility />}
              </div>
            </div>
          </div>
          <Button disabled sx={{ backgroundColor: "#FCEDD4", fontSize: 11, color: "#ffc76d" }} >
            Claim Reward
            <HiOutlineArrowRight className="ml-2 h-5 w-5" />
          </Button>
        </div>
        <div className=" border-x-2 border-primary-600/50 px-3 py-3">
          <div className="flex justify-start items-center gap-5 rounded-lg">
            <span className="text-lg bg-primary-600/50 p-2 rounded-full">
            <FaUsers />
            </span>
            <span className="text-base">Referral</span>
          </div>
          <div className="flex flex-col mt-3">
            <h1 className="text-2xl text-secondary font-bold">Earn $5 for every friend you invite!</h1>
            <p className="text-sm font-interB flex flex-col mt-3"><span>Earn $5 with Every Successful Referral!</span>
            Invite your friends to join, and when they verify their account, you'll get rewarded with $5!</p>
          </div>
        </div>
        <div className=" px-4 py-4 flex flex-col gap-5 w-1/3 border-l-2 border-primary-600/50">
       <div className="text-base">Unclaim Reward <span className="pl-2"><strong>$0.00</strong></span></div>
       <div className="text-base">Daily Invited<span className="pl-2"><strong>0</strong></span></div>
       <div className="text-base">Total Invited <span className="pl-2"><strong>0</strong></span></div>
       <div className="text-base">Total Rewarded<span className="pl-2"><strong>$0.00</strong></span></div>
      </div>
       </div>
       <div className=" flex justify-start items-center text-base mt-4 pt-4 border-t-2 border-primary-600/50"><span>Referral link</span><h1 className="bg-primary-600/10 px-3 py-2 rounded-lg ml-5 pc:w-[700px] text-secondary/50">https://paysparq.com/!?ref=pftay35</h1> <button className="flex justify-center items-center gap-1 bg-primary-600 px-3 py-2 text-base text-pay rounded-md ml-4" onClick={copyReferralLink}>copy <MdOutlineContentCopy /></button></div>
       <ToastContainer  className="text-[16px]" />
      </div>
      <div className="bg-pay rounded-lg shadow-md shadow-primary-600/40 px-4 py-4 flex flex-col gap-1">
        <h1 className="text-base font-interB">Invite history</h1>
        <div className=" flex flex-col justify-center items-center h-[300px]">
          <h2 className="text-secondary font-interB text-lg">No referred friends</h2>
          <p className="text-base w-2/3 text-center text-secondary/50">Once you have invited your friends, the information appears here</p>
        </div>

      </div>
    </div>
  );
};

export default Referral;
