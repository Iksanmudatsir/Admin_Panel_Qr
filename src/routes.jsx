import {
  HomeIcon,
  UserCircleIcon,
  TableCellsIcon,
  QueueListIcon,
  ArrowRightOnRectangleIcon,
} from "@heroicons/react/24/solid";
import { Order, Item, Receipt, Notifications } from "@/pages/dashboard";
import { SignIn, SignUp } from "@/pages/auth";
import Home from "./pages/dashboard/home";

const icon = {
  className: "w-5 h-5 text-inherit",
};

export const routes = [
  {
    layout: "dashboard",
    pages: [
      {
        icon: <HomeIcon {...icon} />,
        name: "Home",
        path: "/home",
        element: <Home />,
      },
      {
        icon: <QueueListIcon {...icon} />,
        name: "Order",
        path: "/order",
        element: <Order />,
      },
      {
        icon: <TableCellsIcon {...icon} />,
        name: "Receipt",
        path: "/receipt",
        element: <Receipt />,
      },
      {
        icon: <UserCircleIcon {...icon} />,
        name: "Item",
        path: "/item",
        element: <Item />,
      },
    ],
  },
];

export default routes;

// {
//   title: "auth pages",
//   layout: "auth",
//   pages: [
//     {
//       icon: <ArrowRightOnRectangleIcon {...icon} />,
//       name: "sign in",
//       path: "/sign-in",
//       element: <SignIn />,
//     },
//   ],
// },

 // {
      //   icon: <BellIcon {...icon} />,
      //   name: "notifactions",
      //   path: "/notifactions",
      //   element: <Notifications />,
      // },

  // {
      //   icon: <UserPlusIcon {...icon} />,
      //   name: "sign up",
      //   path: "/sign-up",
      //   element: <SignUp />,
      // },
