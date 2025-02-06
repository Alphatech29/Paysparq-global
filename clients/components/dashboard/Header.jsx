import React from "react";
import NotificationsIcon from "@mui/icons-material/Notifications";
import DashboardLogic from "../../components/dashboard/dashboard"

function Header() {
  const { userData } = DashboardLogic() 
 
  return (
    <div className="w-[81.5%] h-auto bg-pay px-5 py-1 flex items-center justify-between border-b shadow border-b-primary-600 fixed top-0 right-0 z-10">
      <div className="flex items-center justify-center gap-3">
       
      </div>
      <div className="flex items-center justify-center gap-5">
        <img src={userData?.avatar} className="rounded-full w-10 h-10 border border-primary-600/50"/>
       
        <div className="flex items-center gap-2">
          <NotificationsIcon />
          <span className="text-red-600">0</span>
        </div>
      </div>
    </div>
  );
}

export default Header;
