import { useState } from "react";

const initialData = {
  1: ["A", "B", "C"],
  2: ["A", "B", "C", "D"],
  3: ["A", "B"],
  4: ["A", "B"]
};

export default function Timetable() {
  const [data, setData] = useState(initialData);
  const [year, setYear] = useState(1);
  const [section, setSection] = useState("A");

  return (
    <div className="timetable">
      <select onChange={e => setYear(e.target.value)}>
        {Object.keys(data).map(y => <option key={y}>{y}</option>)}
      </select>

      <select onChange={e => setSection(e.target.value)}>
        {data[year].map(sec => <option key={sec}>{sec}</option>)}
      </select>

      <div className="timetable-box">
        Timetable for Year {year} - Section {section}
      </div>
    </div>
  );
}
