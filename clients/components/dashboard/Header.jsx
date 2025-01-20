import React from "react";
import { Avatar, Dropdown } from "flowbite-react";
import NotificationsIcon from "@mui/icons-material/Notifications";

function Header() {
 

  return (
    <div className="w-[81.5%] h-auto bg-pay px-5 py-1 flex items-center justify-between border-b shadow border-b-primary-600 fixed top-0 right-0 z-10">
      <div className="flex items-center justify-center gap-3">
       
      </div>
      <div className="flex items-center justify-center gap-5">
        <span className="p-2 bg-primary-600 text-pay text-sm rounded-lg font-interSB">$100,000.00</span>
        <Avatar img="https://flowbite.com/docs/images/people/profile-picture-5.jpg" rounded alt="Profile Picture" />
        
        <div className="flex items-center gap-2">
          <NotificationsIcon />
          <span className="text-red-600">0</span>
        </div>
      </div>
    </div>
  );
}

export default Header;
