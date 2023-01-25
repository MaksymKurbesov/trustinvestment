import { ACCOUNT_ROUTE, LOGIN_ROUTE } from "./utils/consts";
import { Login } from "./pages/Login/Login";
import { MyAccount } from "./components/My-Account-Layout/My-Account-Layout";

export const publicRoutes = [
  {
    path: LOGIN_ROUTE,
    element: <Login />,
  },
];

export const privateRoutes = [
  {
    path: ACCOUNT_ROUTE,
    element: <MyAccount />,
  },
];
