// import "./Filter.css";

interface DateFieldProps {
  label: string;
  value: string; // stored as YYYY-MM-DD
  onChange: (value: string) => void;
}

export default function DateField({ label, value, onChange }: DateFieldProps) {
  // Format for display: "October 29"
  // const human = new Date(value).toLocaleDateString("en-US", {
  //   month: "long",
  //   day: "numeric",
  // });

  return (
    <div className="filter-item">
      <label className="filter-label">{label}</label>
      <input
        type="date"
        className="filter-select"
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
      {/* <div className="date-display">{human}</div> */}
    </div>
  );
}
