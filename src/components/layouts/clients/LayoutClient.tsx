import HeaderClient from "../../views/clients/HeaderClient";
import FooterClient from "../../views/clients/FooterClient";
import { Outlet } from "react-router-dom";

const LayoutClient = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <HeaderClient />
      <div className="max-w-screen-lg mx-auto px-4 sm:px-6 lg:px-8">
        <Outlet />
      </div>
      <FooterClient />
    </div>
  );
};

export default LayoutClient;
