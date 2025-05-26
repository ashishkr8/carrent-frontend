

import { useState } from "react";
import ReportButton from "../atoms/ReportButton";
import ReportTypeDropdown from "../atoms/ReportTypeDropdown";
import LocationDropdown from "../atoms/LocationDropdown";
import PeriodDropdown from "../atoms/PeriodDropdown";
import FilteredReportTable from "../atoms/FilteredReportTable";
import DownloadDropdown from "../atoms/DownloadDropdown";
import Alert from "../atoms/Alert";

const Dashboard = () => {
  const [showReport, setShowReport] = useState(false);
  const [reportType, setReportType] = useState<"Sales Report" | "Staff Performance" | "">("");
  const [location, setLocation] = useState("Location");
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);
  const [exportData, setExportData] = useState<any[]>([]);
  const [alert, setAlert] = useState<{
    type: "success" | "error";
    message: string;
    sub?: string;
  } | null>(null);

  const handleExport = (data: any[]) => {
    setExportData(data);
  };

  const handleCreateReport = () => {
  const isReportTypeValid = reportType === "Sales Report" || reportType === "Staff Performance";
  const isLocationValid = location !== "Location";
  const isStartDateValid = startDate !== null;
  const isEndDateValid = endDate !== null;

  const isDateRangeValid =
    isStartDateValid &&
    isEndDateValid &&
    startDate! <= endDate!;

  if (!isReportTypeValid || !isLocationValid || !isDateRangeValid) {
    let subMsg = "Please select Report Type, Location, and a valid Period.";
    if (isStartDateValid && isEndDateValid && !isDateRangeValid) {
      subMsg = "Start date must be before or equal to end date.";
    }

    setAlert({
      type: "error",
      message: "Missing or Invalid Fields",
      sub: subMsg,
    });
    return;
  }

  setShowReport(true);
};


  return (
    <>
      {alert && (
        <div className="fixed top-5 left-1/2 transform -translate-x-1/2 z-50 w-[90%] max-w-md">
          <Alert
            type={alert.type}
            message={alert.message}
            subMessage={alert.sub}
            onClose={() => setAlert(null)}
          />
        </div>
      )}

      <div className="p-3 w-full">
        <div className="text-4xl font-semibold">Dashboard</div>
      </div>

      <div className="px-2 sm:px-4 mb-4 w-full">
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-end items-center gap-4">
          {/* Filters */}
          <div className="flex flex-col sm:flex-row gap-3 items-center sm:items-end w-full sm:w-auto">
            <ReportTypeDropdown onSelect={setReportType} />
            <LocationDropdown onChange={setLocation} />
            <PeriodDropdown
              onPeriodChange={({ start, end }) => {
                setStartDate(start);
                setEndDate(end);
              }}
            />
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3">
            {showReport && exportData.length > 0 && (
              <DownloadDropdown data={exportData} reportType={reportType} />
            )}
            <ReportButton
              className="px-4 py-2 text-sm whitespace-nowrap"
              onClick={handleCreateReport}
            >
              Create Report
            </ReportButton>
          </div>
        </div>
      </div>

      {showReport && (reportType === "Sales Report" || reportType === "Staff Performance") && (
        <div className="px-2 sm:px-4 overflow-x-auto">
          <FilteredReportTable
            reportType={reportType}
            location={location}
            startDate={startDate}
            endDate={endDate}
            onExport={handleExport}
          />
        </div>
      )}
    </>
  );
};

export default Dashboard;
