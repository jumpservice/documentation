import React from 'react';

interface HorizontalTableProps {
  headers: string[];
  rows: string[][];
  firstColumnRatio?: number; // 控制第一列占比，默认 1/3
}

const HorizontalTable: React.FC<HorizontalTableProps> = ({ headers, rows, firstColumnRatio = "1/3" }) => {
  const firstColumnClass = `basis-${firstColumnRatio}`;

  return (
    <div className="overflow-x-auto w-full mt-4 pr-20">
      {/* Headers */}
      <div className="flex border-b-2 dark:border-gray-700">
        {headers.map((header, index) => (
          <div
            key={index}
            className={
              `
                py-2 px-4 text-left text-sm font-semibold 
                ${index === 0 ? firstColumnClass : 'flex-1'}
              `
            }
          >
            {header}
          </div>
        ))}
      </div>

      {/* Rows */}
      {rows.map((row, rowIndex) => (
        <div key={rowIndex} className="flex border-b dark:border-gray-700">
          {row.map((cell, cellIndex) => (
            <div
              key={cellIndex}
              className={
                `
                  py-4 px-4 text-left text-sm 
                  ${cellIndex === 0 ? `font-bold ${firstColumnClass}` : 'flex-1'}
                `
              }
            >
              {cell}
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};

export default HorizontalTable;
