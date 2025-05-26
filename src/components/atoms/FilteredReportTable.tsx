//NEW CODE

import React, { useEffect, useState, useMemo, useCallback } from "react";
import { locationsMap,BASE_URL_REPORTS } from "../../../constants";
import axios from "axios";

type Props = {
  reportType: "Sales Report" | "Staff Performance";
  location: string;
  startDate: Date | null;
  endDate: Date | null;
  onExport?: (data: any[]) => void;
};

const FilteredReportTable: React.FC<Props> = ({
  reportType,
  location,
  startDate,
  endDate,
  onExport,
}) => {
  const [carData, setCarData] = useState<any[]>([]);
  const [agentData, setAgentData] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  // Format dates to YYYY-MM-DD for query params
  const formatDate = (d: Date | null) =>
    d ? d.toISOString().split("T")[0] : "";

  const fetchData = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      // Build API URL with query params

      const params = new URLSearchParams();
      params.append(
        "reportType",
        reportType === "Sales Report" ? "sales" : "staff"
      );
      if (startDate) params.append("dateFrom", formatDate(startDate));
      if (endDate) params.append("dateTo", formatDate(endDate));

      const response = await axios.get(`${BASE_URL_REPORTS}/reports/?${params.toString()}`);
      const data = response.data;
      console.log(data);

      if (!data || !data.content) {
        throw new Error("Unexpected API response structure");
      }

      if (reportType === "Sales Report") {
        // Normalize keys to camelCase and ensure null-safe mapping
        const normalized = data.content.map((item: any) => ({
          periodStart: item["Report Period Start"] ?? null,
          periodEnd: item["Report Period End"] ?? null,
          location: item["Location"] ?? null,
          carModel: item["Car Model"] ?? null,
          carID: item["Car ID"] ?? null,
          daysOfRent: item["Days Rented"] ?? null,
          reservationsDuringPeriod: item["Reservations"] ?? null,
          mileageStart: item["Mileage Start"] ?? null,
          mileageEnd: item["Mileage End"] ?? null,
          totalMileage: item["Total KM"] ?? null,
          averageMileagePerReservation: item["Avg KM/Res"] ?? null,
          deltaMileagePerReservation: item["Δ Avg KM/Res (%)"] ?? null,
          averageFeedback: item["Avg Feedback"] ?? null,
          minimumFeedback: item["Min Feedback"] ?? null,
          deltaFeedback: item["Δ Feedback (%)"] ?? null,
          revenue: item["Revenue (€)"] ?? null,
          deltaRevenue: item["Δ Revenue (%)"] ?? null,
        }));
        setCarData(normalized);
      } else if (reportType === "Staff Performance") {
        // Normalize keys to camelCase for easier usage in table
        const normalized = data.content.map((item: any) => ({
          agency: item["CarRent Agency"],
          agentName: item["Support Agent"],
          agentEmail: item["Support Agent Email"],
          periodStart: item["Report Period Start"],
          periodEnd: item["Report Period End"],
          bookingsProcessed: item["Bookings Processed"],
          deltaBookingsProcessed: item["Δ Bookings (%)"],
          averageFeedback: item["Avg Feedback"],
          minimumFeedback: item["Min Feedback"],
          deltaFeedback: item["Δ Feedback (%)"],
          revenue: item["Revenue (€)"],
          deltaRevenue: item["Δ Revenue (%)"],
        }));
        setAgentData(normalized);
      }
    } catch (err: any) {
      setError(err.message || "Failed to fetch report data");
      setCarData([]);
      setAgentData([]);
    } finally {
      setLoading(false);
    }
  }, [reportType, startDate, endDate]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const isWithinRange = useCallback(
    (start: string, end: string) => {
      const s = new Date(start);
      const e = new Date(end);
      const matchStart = !startDate || e >= startDate;
      const matchEnd = !endDate || s <= endDate;
      return matchStart && matchEnd;
    },
    [startDate, endDate]
  );

  // Filtering for sales data - example assumes fields periodStart and periodEnd
  const filteredCarData = useMemo(() => {
    const locationCode = locationsMap[location] || location;
    return carData.filter(
      (item) =>
        (location === "Location" || item.location === locationCode) &&
        isWithinRange(item.periodStart, item.periodEnd)
    );
  }, [carData, location, isWithinRange]);

  // Filtering for agent data by date range (agency/location filtering not included here)
  const filteredAgentData = useMemo(() => {
    return agentData.filter((item) =>
      isWithinRange(item.periodStart, item.periodEnd)
    );
  }, [agentData, isWithinRange]);

  useEffect(() => {
    if (onExport) {
      const dataToExport =
        reportType === "Sales Report" ? filteredCarData : filteredAgentData;
      onExport(dataToExport);
    }
  }, [onExport, reportType, filteredCarData, filteredAgentData]);

  if (loading)
    return (
      <div className="text-sm text-gray-600 px-4 py-2">Loading report...</div>
    );
  if (error)
    return <div className="text-sm text-red-600 px-4 py-2">Error: {error}</div>;

  if (reportType === "Sales Report") {
    return (
      <div className="mt-4 px-1 sm:px-2 md:px-4 lg:px-6 max-w-full">
        <h2 className="text-xl font-semibold mb-2">Sales Statistics</h2>
        <div className="w-full overflow-x-auto">
          <table className="min-w-[720px] w-full border-collapse border text-sm">
            <thead className="bg-black text-white">
              <tr>
                <th className="border px-2 py-1">Report Period Start</th>
                <th className="border px-2 py-1">Report Period End</th>
                <th className="border px-2 py-1">Location</th>
                <th className="border px-2 py-1">Car Model</th>
                <th className="border px-2 py-1">Car ID</th>
                <th className="border px-2 py-1">Days Rented</th>
                <th className="border px-2 py-1">Reservations</th>
                <th className="border px-2 py-1">Mileage Start</th>
                <th className="border px-2 py-1">Mileage End</th>
                <th className="border px-2 py-1">Total KM</th>
                <th className="border px-2 py-1">Avg KM/Res</th>
                <th className="border px-2 py-1">Δ Avg KM/Res (%)</th>
                <th className="border px-2 py-1">Avg Feedback</th>
                <th className="border px-2 py-1">Min Feedback</th>
                <th className="border px-2 py-1">Δ Feedback (%)</th>
                <th className="border px-2 py-1">Revenue (€)</th>
                <th className="border px-2 py-1">Δ Revenue (%)</th>
              </tr>
            </thead>
            <tbody className="bg-[#FFFBF3]">
              {filteredCarData.length === 0 ? (
                <tr>
                  <td colSpan={17} className="text-center p-2 text-gray-500">
                    No matching data found.
                  </td>
                </tr>
              ) : (
                filteredCarData.map((item, idx) => (
                  <tr key={idx}>
                    <td className="border px-2 py-1">{item.periodStart}</td>
                    <td className="border px-2 py-1">{item.periodEnd}</td>
                    <td className="border px-2 py-1">{item.location}</td>
                    <td className="border px-2 py-1">{item.carModel}</td>
                    <td className="border px-2 py-1">{item.carID}</td>
                    <td className="border px-2 py-1">{item.daysOfRent}</td>
                    <td className="border px-2 py-1">
                      {item.reservationsDuringPeriod}
                    </td>
                    <td className="border px-2 py-1">{item.mileageStart}</td>
                    <td className="border px-2 py-1">{item.mileageEnd}</td>
                    <td className="border px-2 py-1">{item.totalMileage}</td>
                    <td className="border px-2 py-1">
                      {item.averageMileagePerReservation}
                    </td>
                    <td className="border px-2 py-1">
                      {item.deltaMileagePerReservation}%
                    </td>
                    <td className="border px-2 py-1">{item.averageFeedback}</td>
                    <td className="border px-2 py-1">{item.minimumFeedback}</td>
                    <td className="border px-2 py-1">{item.deltaFeedback}%</td>
                    <td className="border px-2 py-1">{item.revenue}</td>
                    <td className="border px-2 py-1">{item.deltaRevenue}%</td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    );
  }

  if (reportType === "Staff Performance") {
    return (
      <div className="mt-4 px-1 sm:px-2 md:px-4 lg:px-6 max-w-full">
        <h2 className="text-xl font-semibold mb-2">
          Support Agent Performance
        </h2>
        <div className="w-full overflow-x-auto">
          <table className="min-w-[720px] w-full border-collapse border text-sm">
            <thead className="bg-black text-white">
              <tr>
                <th className="border px-2 py-1">CarRent Agency</th>
                <th className="border px-2 py-1">Support Agent</th>
                <th className="border px-2 py-1">Support Agent Email</th>
                <th className="border px-2 py-1">Report Period Start</th>
                <th className="border px-2 py-1">Report Period End</th>
                <th className="border px-2 py-1">Bookings Processed</th>
                <th className="border px-2 py-1">Δ Bookings (%)</th>
                <th className="border px-2 py-1">Avg Feedback</th>
                <th className="border px-2 py-1">Min Feedback</th>
                <th className="border px-2 py-1">Δ Feedback (%)</th>
                <th className="border px-2 py-1">Revenue (€)</th>
                <th className="border px-2 py-1">Δ Revenue (%)</th>
              </tr>
            </thead>
            <tbody className="bg-[#FFFBF3]">
              {filteredAgentData.length === 0 ? (
                <tr>
                  <td colSpan={12} className="text-center p-2 text-gray-500">
                    No matching data found.
                  </td>
                </tr>
              ) : (
                filteredAgentData.map((item, idx) => (
                  <tr key={idx}>
                    <td className="border px-2 py-1">{item.agency}</td>
                    <td className="border px-2 py-1">{item.agentName}</td>
                    <td className="border px-2 py-1">{item.agentEmail}</td>
                    <td className="border px-2 py-1">{item.periodStart}</td>
                    <td className="border px-2 py-1">{item.periodEnd}</td>
                    <td className="border px-2 py-1">
                      {item.bookingsProcessed}
                    </td>
                    <td className="border px-2 py-1">
                      {item.deltaBookingsProcessed}%
                    </td>
                    <td className="border px-2 py-1">{item.averageFeedback}</td>
                    <td className="border px-2 py-1">{item.minimumFeedback}</td>
                    <td className="border px-2 py-1">{item.deltaFeedback}%</td>
                    <td className="border px-2 py-1">{item.revenue}</td>
                    <td className="border px-2 py-1">{item.deltaRevenue}%</td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    );
  }

  return null;
};

export default FilteredReportTable;
