import { useState } from "react";

import Reviews from "./Reviews";
import PersonalInfo from "./PersonalInfo";
import Documents from "./HandleDocuments";
import ChangePassword from "./ChangePassword";
// import {WIN} from "./ChangePassword"

type Section = "reviews" | "personalInfo" | "documents" | "changePassword";

const SideMenu: React.FC = () => {
  const [activeSection, setActiveSection] = useState<Section>("personalInfo");

  const renderSection = () => {
    switch (activeSection) {
      case "reviews":
        return <Reviews />;
      case "personalInfo":
        return <PersonalInfo />;
      case "documents":
        return <Documents />;
      case "changePassword":
        return <ChangePassword />;
        // return <WIN/>
    }
  };

  return (
    <div className="flex flex-col md:flex-row min-h-screen">
      {/* Sidebar/Menu */}
      <aside className="w-full md:w-64 p-4 md:p-8">
        <nav className="flex flex-wrap md:flex-col gap-2 md:gap-4 items-start md:items-start">
          {[
            { key: "reviews", label: "Reviews" },
            { key: "personalInfo", label: "Personal Info" },
            { key: "documents", label: "Documents" },
            { key: "changePassword", label: "Change Password" },
          ].map((item) => (
            <button
              key={item.key}
              onClick={() => setActiveSection(item.key as Section)}
              className={`
                text-sm
                p-2
                rounded
                hover:text-[#CC1D1D] hover:font-semibold
                ${activeSection === item.key ? "text-[#CC1D1D] font-semibold" : "text-black"}
              `}
            >
              {item.label}
            </button>
          ))}
        </nav>
      </aside>

      {/* Main content */}
      <main className="flex-1 p-4 md:p-6">{renderSection()}</main>
    </div>
  );
};

export default SideMenu;
