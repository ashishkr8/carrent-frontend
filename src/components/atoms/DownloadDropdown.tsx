
 
 
import { Menu } from "@headlessui/react";
import { DownloadIcon } from "lucide-react";
import { jsPDF } from "jspdf";
import autoTable from "jspdf-autotable";
import Papa from "papaparse";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";

interface Props {
  data: any[];
  reportType: string;
}

const DownloadDropdown = ({ data, reportType }: Props) => {
  const handleExport = (type: string) => {
    if (!data || data.length === 0) {
      alert("No data to export.");
      return;
    }

    const fileName = reportType.replace(/\s+/g, "_");

    switch (type) {
      case "PDF": {
        const doc = new jsPDF();
        const tableData = data.map(Object.values);
        const tableHead = [Object.keys(data[0])];
        doc.text(reportType, 14, 10);
        autoTable(doc, {
          head: tableHead,
          body: tableData,
          startY: 20,
        });
        doc.save(`${fileName}.pdf`);
        break;
      }

      case "CSV": {
        const csv = Papa.unparse(data);
        const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
        saveAs(blob, `${fileName}.csv`);
        break;
      }

      case "XLS": {
        const worksheet = XLSX.utils.json_to_sheet(data);
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, "Report");
        const xlsBlob = XLSX.write(workbook, { bookType: "xlsx", type: "array" });
        const xlsBlobObj = new Blob([xlsBlob], { type: "application/octet-stream" });
        saveAs(xlsBlobObj, `${fileName}.xlsx`);
        break;
      }

      default:
        console.warn("Unsupported format: ", type);
    }
  };

  return (
    <Menu as="div" className="relative inline-block text-left">
      <Menu.Button className="inline-flex items-center px-4 py-2 bg-[#FFFBF3] text-black rounded-md border border-gray-300 hover:bg-[#f2e7cf] focus:outline-none">
        Download
        <DownloadIcon className="ml-2 h-5 w-5" />
      </Menu.Button>

      <Menu.Items className="absolute right-0 mt-2 w-40 origin-top-right bg-[#FFFBF3] border border-gray-200 rounded-md shadow-lg focus:outline-none z-10">
        <div className="py-1">
          {["PDF", "CSV", "XLS"].map((type) => (
            <Menu.Item key={type}>
              {({ active }) => (
                <button
                  onClick={() => handleExport(type)}
                  className={`${
                    active ? "bg-black text-white" : "text-black"
                  } block w-full text-left px-4 py-2 text-sm`}
                >
                  Export {type}
                </button>
              )}
            </Menu.Item>
          ))}
        </div>
      </Menu.Items>
    </Menu>
  );
};

export default DownloadDropdown;
