import React, { useState } from "react";
import { Menu } from "@headlessui/react";
type ReportType = "Staff Performance" | "Sales Report";
 
type Props = {
    onSelect: (reportType: ReportType | "") => void;
};
 
const reportTypes: ReportType[] = ["Staff Performance", "Sales Report"];
 
const ReportTypeDropdown: React.FC<Props> = ({ onSelect }) => {
    const [selected, setSelected] = useState<string>("Report Type");
 
    const handleSelect = (type: ReportType) => {
        setSelected(type);
        onSelect(type); // pass valid selection
    };
 
    return (
        <div className="relative w-full sm:w-64">
            <Menu as="div" className="relative w-full">
                <Menu.Button className="h-12 w-full px-4 py-2 border border-gray-300 rounded-md text-sm bg-[#FFFBF3] hover:border-gray-400 shadow-md flex items-center justify-between">
                    <span className="text-gray-700 font-medium">{selected}</span>
                    <svg className="w-4 h-4 text-gray-500 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                </Menu.Button>
 
                <Menu.Items className="absolute z-10 mt-2 w-full bg-[#FFFBF3] border border-gray-300 rounded-md shadow-lg">
                    <div className="py-1">
                        {reportTypes.map((type) => (
                            <Menu.Item key={type}>
                                {({ active }) => (
                                    <button
                                        onClick={() => handleSelect(type)}
                                        className={`${active ? "bg-black text-white" : "text-gray-700"
                                        } block w-full text-left px-4 py-2 text-sm`}
                                    >
                                        {type}
                                    </button>
                                )}
                            </Menu.Item>
                        ))}
                    </div>
                </Menu.Items>
            </Menu>
        </div>
    );
};
 
export default ReportTypeDropdown;
 
 