import { FaCar, FaCarSide, FaHistory, FaHome, FaUsers } from "react-icons/fa";
import { Link, NavLink, Outlet, useNavigate } from "react-router-dom";
import { CiUser, CiStar, CiHeart } from "react-icons/ci";
import { GiRadioactive, GiTentacleHeart } from "react-icons/gi";
import {
  MdManageHistory,
  MdOutlineBook,
  MdOutlineRateReview,
} from "react-icons/md";
import { RiListOrdered } from "react-icons/ri";
import useDesignation from "../hooks/useDesignation";
import UseAuth from "../hooks/UseAuth";
import { TbLayoutDashboardFilled } from "react-icons/tb";
import { BiLogOut } from "react-icons/bi";
import { GrUserAdmin } from "react-icons/gr";
import { CgMenu } from "react-icons/cg";
import { RxCross2 } from "react-icons/rx";
import { useState } from "react";
import { array } from "prop-types";
import { MdOutlineNotificationsActive } from "react-icons/md";

const Dashboard = () => {
  const navigate = useNavigate();
  const { logout } = UseAuth();
  const { userInfo } = useDesignation();
  const [value, setValue] = useState(false);
  console.log(userInfo);

  console.log(userInfo);

  const handleLogout = async () => {
    await logout();
    navigate("/join");
  };

  const menuItems = {
    admin: [
      {
        to: "/dashboard/admin-home",
        label: "Home",
        icon: <TbLayoutDashboardFilled />,
      },
      { to: "/dashboard/manage-users", label: " Users", icon: <FaUsers /> },
      {
        to: "/dashboard/manage-moderators",
        label: " Moderators",
        icon: <GiTentacleHeart />,
      },
      {
        to: "/dashboard/manage-agencies",
        label: " Agencies",
        icon: <GiTentacleHeart />,
      },
      // { to: "/dashboard/approve-agency", label: "Approve Agency", icon: <GiTentacleHeart /> },
    ],
    user: [
      {
        to: "/dashboard/user-home",
        label: "Dashboard",
        icon: <TbLayoutDashboardFilled />,
      },
      { to: "/dashboard/user-profile", label: "My Profile", icon: <CiUser /> },
      {
        to: "/dashboard/user-bookings",
        label: "Bookings",
        icon: <RiListOrdered />,
      },
      { to: "/dashboard/user-ratings", label: "Reviews", icon: <CiStar /> },
      {
        to: "/dashboard/user-favourite",
        label: "Favourite Cars",
        icon: <CiHeart />,
      },
      {
        to: "/dashboard/notifications",
        label: "notifications",
        icon: <MdOutlineNotificationsActive />,
      },
    ],
    agency: [
      {
        to: "/dashboard/agency-home",
        label: "Dashboard",
        icon: <TbLayoutDashboardFilled />,
      },
      {
        to: "/dashboard/agency/owner",
        label: "Owner Information",
        icon: <GrUserAdmin />,
      },
      {
        to: "/dashboard/agency/add-vehicle-info",
        label: "Add Vehicle",
        icon: <FaCarSide />,
      },

      // { to: "/dashboard/agency/stuff-management", label: "Manage Staff", icon: <FaPeopleGroup /> },
      {
        to: "/dashboard/agency/vehicle-info",
        label: "Vehicle Information",
        icon: <FaCar />,
      },
      {
        to: "/dashboard/agency/booking-history",
        label: "Booking History",
        icon: <FaHistory />,
      },
      {
        to: "/dashboard/agency/booking-request",
        label: "Booking Request",
        icon: <MdOutlineBook />,
      },
      {
        to: "/dashboard/agency/active-booking",
        label: "Active Booking",
        icon: <GiRadioactive />,
      },
      // { to: "/dashboard/agency/customer-management", label: "Customer Management", icon: <IoIosPeople /> },
      {
        to: "/dashboard/agency/review-from-customers",
        label: "Review & Feedback",
        icon: <MdOutlineRateReview />,
      },
    ],
    moderator: [
      {
        to: "/dashboard/moderator-profile",
        label: "Moderator",
        icon: <GiTentacleHeart />,
      },
      {
        to: "/dashboard/approve-agency",
        label: "Approve Agency",
        icon: <GiTentacleHeart />,
      },
    ],
    driver: [
      {
        to: "/dashboard/user-home",
        label: "Dashboard",
        icon: <TbLayoutDashboardFilled />,
      },
      {
        to: "/dashboard/driver-profile",
        label: "Driver Profile",
        icon: <GiTentacleHeart />,
      },
      {
        to: "/dashboard/driver-booking",
        label: "Driver Booking",
        icon: <GiTentacleHeart />,
      },
      {
        to: "/dashboard/user-bookings",
        label: "Bookings",
        icon: <RiListOrdered />,
      },
      {
        to: "/dashboard/user-booking-history",
        label: "Booking History",
        icon: <MdManageHistory />,
      },
      { to: "/dashboard/user-ratings", label: "Reviews", icon: <CiStar /> },
      {
        to: "/dashboard/user-favourite",
        label: "Favourite Cars",
        icon: <CiHeart />,
      },
    ],
  };

  return (
    <div className="flex relative">
      <div className="w-[20%] fixed left-0 hidden lg:block">
        <div className="bg-red-50 min-h-screen font-nunito">
          <ul className="lg:static bg-white p-5 min-h-screen w-[95%] max-w-[300px]">
            <div className="flex justify-between items-center">
              <div className="px-6">
                {userInfo?.image ? (
                  <img
                    src={userInfo?.image}
                    className="w-[150px] h-[150px] object-cover rounded-full border-4 border-primary"
                    alt={userInfo.firstName}
                  />
                ) : (
                  <img
                    src="defaultImageURL" // Replace with a default image URL if no user image
                    className="w-[150px] h-[150px] object-cover rounded-full border-4 border-primary"
                    referrerPolicy="no-referrer"
                    alt="Default User"
                  />
                )}
              </div>
            </div>
            <div className="px-2 space-y-2 pt-8 pb-4">
              {menuItems[userInfo?.userRole]?.map((item, index) => (
                <NavLink
                  key={index}
                  to={item.to}
                  className={({ isActive }) =>
                    `flex p-1 pl-4 gap-2 items-center rounded-lg transition-colors duration-300 
                  ${
                    isActive
                      ? "bg-gradient-to-r from-[#ff4c30] to-white text-white"
                      : "text-gray-700"
                  }`
                  }
                >
                  <div>{item.icon}</div>
                  {item.label}
                </NavLink>
              ))}
            </div>
            <div className="absolute bottom-12 pl-5 flex flex-col font-nunito">
              <Link to={"/"} className="flex gap-1 p-2 items-center">
                <FaHome />
                Back to Home
              </Link>
              <button
                onClick={handleLogout}
                className="flex gap-2 pl-1 text-red-500 items-center"
              >
                <BiLogOut />
                Logout
              </button>
            </div>
          </ul>
        </div>
      </div>

      <div className="w-[80%] h-screen absolute right-0">
        <Outlet />
      </div>
    </div>
  );
};

export default Dashboard;
