import React, { useState, useEffect } from "react";
import { Menu } from "@headlessui/react";
 
interface Location {
  locationName: string;
}
 
const LocationDropdown: React.FC<{ onChange: (val: string) => void }> = ({ onChange }) => {
    const [selected, setSelected] = useState("Location");
    const [locations, setLocations] = useState<string[]>([]);
 
    useEffect(() => {
        const fetchLocations = async () => {
            try {
                const response = await fetch("https://bnrjm4j5x5.execute-api.eu-north-1.amazonaws.com/dev/home/locations");
                const data = await response.json();
                console.log("Fetched locations:", data);
 
                if (Array.isArray(data.content)) {
                    const names = data.content.map((item: Location) => item.locationName);
                    setLocations(names);
                }
            } catch (error) {
                console.error("Failed to fetch locations:", error);
            }
        };
 
        fetchLocations();
    }, []);
 
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
                    <div className="py-1 max-h-64 overflow-y-auto">
                        {locations.length === 0 ? (
                            <div className="px-4 py-2 text-sm text-gray-500">No locations found</div>
                        ) : (
                            locations.map((location) => (
                                <Menu.Item key={location}>
                                    {({ active }) => (
                                        <button
                                            onClick={() => {
                                                setSelected(location);
                                                onChange(location);
                                            }}
                                            className={`${
                                                active ? "bg-black text-white" : "text-gray-700"
                                            } block w-full text-left px-4 py-2 text-sm`}
                                        >
                                            {location}
                                        </button>
                                    )}
                                </Menu.Item>
                            ))
                        )}
                    </div>
                </Menu.Items>
            </Menu>
        </div>
    );
};
 
export default LocationDropdown;
 
 
 