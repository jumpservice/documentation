import React from 'react';

interface HorizontalTableProps {
  headers: string[];
  rows: string[][];
}

const HorizontalTable: React.FC<HorizontalTableProps> = ({ headers, rows }) => {
  return (
    <div className="overflow-x-auto w-full mt-4 pr-20">
      {/* Headers */}
      <div
        className="grid border-b-2 dark:border-gray-700"
        style={{ gridTemplateColumns: `repeat(${headers.length}, 1fr)` }}
      >
        {headers.map((header, index) => (
          <div key={index} className="py-2 px-4 text-left text-sm font-semibold">
            {header}
          </div>
        ))}
      </div>

      {/* Rows */}
      {rows.map((row, rowIndex) => (
        <div
          key={rowIndex}
          className="grid border-b dark:border-gray-700"
          style={{ gridTemplateColumns: `repeat(${headers.length}, 1fr)` }}
        >
          {row.map((cell, cellIndex) => (
            <div key={cellIndex} className={`py-4 px-4 text-left text-sm ${cellIndex === 0? "font-bold": ""}`}>
              {cell}
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};

export default HorizontalTable;