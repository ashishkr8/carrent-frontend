// import "./Filter.css";

import { useEffect, useRef } from "react";

interface PriceRangeProps {
  min: number;
  max: number;
  step: number;
  valueMin: number;
  valueMax: number;
  onMinChange: (val: number) => void;
  onMaxChange: (val: number) => void;
}

export default function PriceRange({
  min,
  max,
  step,
  valueMin,
  valueMax,
  onMinChange,
  onMaxChange,
}: PriceRangeProps) {
  const track = useRef<HTMLDivElement>(null);

  // update CSS vars for the colored track
  useEffect(() => {
    if (!track.current) return;
    const range = max - min;
    const minPct = ((valueMin - min) / range) * 100;
    const maxPct = ((valueMax - min) / range) * 100;
    track.current.style.setProperty("--min", `${minPct}%`);
    track.current.style.setProperty("--max", `${maxPct}%`);
  }, [valueMin, valueMax, min, max]);

  return (
    <div className="filter-item price-item">
      <div className="price-header">
        <label className="filter-label">Price per day</label>
        <span className="price-value">
          ${valueMin} – ${valueMax}
        </span>
      </div>
      <div className="price-row" ref={track}>
        <input
          type="range"
          className="price-range thumb-min"
          min={min}
          max={max}
          step={step}
          value={valueMin}
          onChange={(e) =>
            onMinChange(Math.min(+e.target.value, valueMax - step))
          }
        />
        <input
          type="range"
          className="price-range thumb-max"
          min={min}
          max={max}
          step={step}
          value={valueMax}
          onChange={(e) =>
            onMaxChange(Math.max(+e.target.value, valueMin + step))
          }
        />
      </div>
    </div>
  );
}
