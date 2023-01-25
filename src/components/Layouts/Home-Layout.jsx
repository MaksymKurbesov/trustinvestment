import { MainHeader } from "../Main-Header/Main-Header";
import { Outlet } from "react-router-dom";
import { MainFooter } from "../Main-Footer/Main-Footer";

const HomeLayout = () => {
  return (
    <>
      <MainHeader />
      <Outlet />
      <MainFooter />
    </>
  );
};

export { HomeLayout };
