import React from "react";
import "./SelectBox.css";

interface SelectBoxProps {
  value: string;
  options: {
    [group: string]: Array<{
      value: string;
      label: string;
    }>;
  };
  onChange: (value: string) => void;
  disabled?: boolean;
}

const SelectBox = ({ value, options, onChange, disabled }: SelectBoxProps) => {
  return (
    <select
      className="select"
      value={value}
      onChange={(e) => onChange(e.target.value)}
      disabled={disabled}
    >
      {Object.entries(options).map(([country, cities]) => (
        <optgroup key={country} label={country}>
          {cities.map((city) => (
            <option key={city.value} value={city.value}>
              {city.label}
            </option>
          ))}
        </optgroup>
      ))}
    </select>
  );
};

export default SelectBox; 