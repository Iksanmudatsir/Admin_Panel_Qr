import { useLocation, Link, useNavigate } from "react-router-dom";
import {
  Navbar,
  Typography,
  Button,
  IconButton,
  Breadcrumbs,
  Input,
  Menu,
  MenuHandler,
  MenuList,
  MenuItem,
  Avatar,
} from "@material-tailwind/react";
import {
  UserCircleIcon,
  Cog6ToothIcon,
  BellIcon,
  ClockIcon,
  CreditCardIcon,
  Bars3Icon,
  ArrowLeftOnRectangleIcon,
} from "@heroicons/react/24/solid";
import {
  useMaterialTailwindController,
  setOpenConfigurator,
  setOpenSidenav,
} from "@/context";
import { useState, useRef, useEffect } from "react";
import SocketInstance from "@/utils/SocketInstance";

export function DashboardNavbar() {
  const [controller, dispatch] = useMaterialTailwindController();
  const { fixedNavbar, openSidenav } = controller;
  const { pathname } = useLocation();
  const [layout, page] = pathname.split("/").filter((el) => el !== "");

  const [isDropdownOpen, setIsDropdownOpen] = useState (false);
  const [showConfirmation, setShowConfirmaton] = useState(false);

  const dropdownRef = useRef(null);

  const handleOutsideClick = (event) => {
    if (
      dropdownRef.current &&
      !dropdownRef.current.contains(event.target)
    ) {
      setIsDropdownOpen(false);
    }
  };

  const [showNotification, setShowNotification] = useState(true);

  // const handleClick = () => {
  //   if (!showNotification) {
  //     setShowNotification(true);
  //     console.log("Notifikasi diklik");
  //   }
  // };

useEffect(() => {
  document.addEventListener("mousedown", handleOutsideClick);
  
  let timeoutId;

  SocketInstance.on("receive_order", (data) => {
    setShowNotification(true);
    console.log("socket di header");
  
    clearTimeout(timeoutId);
  
    timeoutId = setTimeout(() => {
      setShowNotification(false);
    }, 10000);
  });

  // setShowNotification(true);
  // console.log("tanpa pesanan coba");

  return () => {
    document.removeEventListener("mousedown", handleOutsideClick);
    clearTimeout(timeoutId);
  };
}, [SocketInstance]);

  const navigate = useNavigate();

  const onClickHandler = async () => {
    removeAuth();
    navigate('/login');
  };

  const handleLogout = () => {
    setShowConfirmaton(false);
  }

  return (
    <Navbar
      color={fixedNavbar ? "white" : "transparent"}
      className={`rounded-xl transition-all ${fixedNavbar
        ? "sticky top-4 z-40 py-3 shadow-md shadow-blue-gray-500/5"
        : "px-0 py-1"
        }`}
      fullWidth
      blurred={fixedNavbar}
    >
      <div className="flex flex-col-reverse justify-between gap-6 md:flex-row md:items-center">
        <div className="capitalize">
          <Breadcrumbs
            className={`bg-transparent p-0 transition-all ${fixedNavbar ? "mt-1" : ""
              }`}
          >
            <Link to={`/${layout}`}>
              <Typography
                variant="small"
                color="blue-gray"
                className="font-normal opacity-50 transition-all hover:text-blue-500 hover:opacity-100"
              >
                {layout}
              </Typography>
            </Link>
            <Typography
              variant="small"
              color="blue-gray"
              className="font-normal"
            >
              {page}
            </Typography>
          </Breadcrumbs>
          <Typography variant="h6" color="blue-gray">
            {page}
          </Typography>
        </div>
        <div className="flex items-center">
          {/* <div className="mr-auto md:mr-4 md:w-56">
            <Input label="Type here" />
          </div> */}
          <IconButton
            variant="text"
            color="blue-gray"
            className="grid xl:hidden"
            onClick={() => setOpenSidenav(dispatch, !openSidenav)}
          >
            <Bars3Icon strokeWidth={3} className="h-6 w-6 text-blue-gray-500" />
          </IconButton>
          {/* Profile */}
          <div className="relative">
            <Button
              variant="text"
              color="blue-gray"
              className="hidden items-center gap-1 px-4 xl:flex"
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              >
                <UserCircleIcon className="h-5 w-5 text-blue-gray-500" />
              </Button>
              <IconButton
                variant="text"
                color="blue-gray"
                className="grid xl:hidden"
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                >
                  <UserCircleIcon className="h-5 w-5 text-blue-gray-500" />
                </IconButton>

                {isDropdownOpen && (
                  <div 
                    className="z-50 absolute right-0 mt-2 w-48 bg-white border border-gray-300 rounded-lg shadow"
                    ref={dropdownRef}
                    >
                    <div>
                      <button
                        type="button"
                        className="w-full px-4 py-3 text-sm text-left text-black hover:bg-gray-100 border-b"
                        // onClick={() => setShowConfirmaton(true)}
                        >
                          nama
                        </button>
                        <button
                          type="button"
                          className="w-full px-4 py-3 text-sm text-left text-black hover:bg-gray-100 border-t flex"
                          onClick={() => setShowConfirmaton(true)}
                          >
                            <ArrowLeftOnRectangleIcon className="w-5 h-5 text-inherit flex mr-1" />
                            Logout
                          </button>
                    </div>
                  </div>
                )}
          </div>

          {/* Configuration */}
          <IconButton
            variant="text"
            color="blue-gray"
            onClick={() => setOpenConfigurator(dispatch, true)}
            >
              <Cog6ToothIcon className="h-5 w-5 text-blue-gray-500" />
            </IconButton>

          {/* Logout */}
          {showConfirmation && (
            <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 pl-32 z-50">
              <div className="bg-white p-4 rounded-lg">
                <div className="flex flex-col items-center p-1">
                  <div className="flex justify-center flex-col mb-4">
                    <UserCircleIcon className="w-10 h-10 text-red-500" />
                    <div className="mt-2 text-sm text-left text-black font-semibold flex justify-center">nama</div>
                  </div>
                  <p className="text-sm mb-4 font-medium text-black text-center flex">Are you sure you want to logout?</p>
                  <div className="flex justify-center">
                    <Button
                      type="button"
                      className="px-4 py-2 text-white bg-red-500 rounded-lg mr-2"
                      onClick={() => onClickHandler()}
                      fullWidth
                      >
                        Logout
                      </Button>
                      <Button
                        type="button"
                        className="px-4 py-2 text-gray-500 border bg-white rounded-lg order-gray-500"
                        onClick={() => setShowConfirmaton(false)}
                        >
                          Cancel
                        </Button>
                  </div>
                </div>
              </div>
            </div>
          )}
          <Menu>
            <MenuHandler>
              <IconButton variant="text" color="blue-gray">
                <BellIcon className="h-5 w-5 text-blue-gray-500" />
              </IconButton>
            </MenuHandler>
            {showNotification && (
            <MenuList className="w-max border-0">
              <MenuItem className="flex items-center gap-3">
                <Avatar
                  src="https://demos.creative-tim.com/material-dashboard/assets/img/team-2.jpg"
                  alt="item-1"
                  size="sm"
                  variant="circular"
                />
                <div>
                  <Typography
                    variant="small"
                    color="blue-gray"
                    className="mb-1 font-normal"
                  >
                    <strong>New Order</strong> from table
                  </Typography>
                  <Typography
                    variant="small"
                    color="blue-gray"
                    className="flex items-center gap-1 text-xs font-normal opacity-60"
                  >
                    <ClockIcon className="h-3.5 w-3.5" /> 13 minutes ago
                  </Typography>
                </div>
              </MenuItem>
            </MenuList>
            )}
          </Menu>
        </div>
      </div>
    </Navbar>
  );
}

DashboardNavbar.displayName = "/src/widgets/layout/dashboard-navbar.jsx";

export default DashboardNavbar;
