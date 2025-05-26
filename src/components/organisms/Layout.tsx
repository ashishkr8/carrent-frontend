import React from "react";
import Header from "../atoms/Header";
import Footer from "../atoms/Footer";
import { Outlet } from "react-router-dom";

// interface PropTypes {
//   children: ReactNode;
// }
const Layout: React.FC = () => {
  return (
    <>
      <Header />
      <Outlet />
      <Footer />
    </>
  );
};

export default Layout;
