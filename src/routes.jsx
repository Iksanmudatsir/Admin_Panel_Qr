import {
  HomeIcon,
  UserCircleIcon,
  TableCellsIcon,
  ArrowRightOnRectangleIcon,
} from "@heroicons/react/24/solid";
import { Home, Profile, Tables, Notifications } from "@/pages/dashboard";
import { SignIn, SignUp } from "@/pages/auth";

const icon = {
  className: "w-5 h-5 text-inherit",
};

export const routes = [
  {
    layout: "dashboard",
    pages: [
      {
        icon: <HomeIcon {...icon} />,
        name: "Order",
        path: "/Order",
        element: <Home />,
      },
      {
        icon: <TableCellsIcon {...icon} />,
        name: "receipt",
        path: "/receipt",
        element: <Tables />,
      },
      {
        icon: <UserCircleIcon {...icon} />,
        name: "food",
        path: "/food",
        element: <Profile />,
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
