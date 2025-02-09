import React, { useContext, useEffect, useState } from "react";
import NotificationsIcon from "@mui/icons-material/Notifications";
import { useEmployeeAuth } from "../control/EmployeeAuthContext";


function Header() {
  const { employeeDetails } = useEmployeeAuth();
  const [notifications, setNotifications] = useState(0);

  useEffect(() => {
    if (employeeDetails) {
      setNotifications(employeeDetails.notifications || 0);
    }
  }, [employeeDetails]);

  return (
    <div className="w-[81.5%] h-auto bg-pay px-5 py-1 flex items-center justify-between border-b shadow border-b-primary-600 fixed top-0 right-0 z-10">
      <div className="flex items-center justify-center gap-3">
        <h1 > <strong>{employeeDetails?.role} Dashboard</strong> </h1>
      </div>
      <div className="flex items-center justify-center gap-5">
        <img 
          src={employeeDetails?.avatar}
          alt="User Avatar"
          className="rounded-full w-10 h-10 border border-primary-600/50"
        />
       
        <div className="flex items-center gap-2">
          <NotificationsIcon />
          <span className="text-red-600">{notifications}</span>
        </div>
      </div>
    </div>
  );
}

export default Header;
