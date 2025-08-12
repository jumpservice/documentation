import React from 'react';
import Icon from './icons';

interface TableRowItem {
  content: string;
  link?: string;
  linkIcon?: boolean;
}

interface TableProps {
  headers: string[];
  rows: Array<Array<TableRowItem>> | (() => Array<Array<TableRowItem>>);
  title?: string;
}

const CompareVersionsDataTable: React.FC<TableProps> = ({ headers, rows, title }) => {
  const resolvedRows = typeof rows === 'function' ? rows() : rows;

  return (
    <div className="overflow-x-auto text-[14px] mt-10 mb-16">

      {title && (
        <div className="text-lg text-center font-semibold mb-5"> {title} </div>
      )}

      <table className="min-w-full table-auto border-collapse rounded-lg">
        <thead>
          <tr className="text-center text-md font-semibold text-black dark:text-white">
            {headers.map((header, index) => (
              <th
                key={index}
                className={`whitespace-nowrap py-3 pl-0 pr-4 border-b border-[#E5E7EB] dark:border-[#262626] font-semibold ${index === 0 ? 'text-left' : 'text-center'}`}
              >
                {header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
        {resolvedRows.map((row, rowIndex) => (
            <tr
              key={rowIndex}
              className=""
            >
              {row.map((cell, cellIndex) => (
                <td
                  key={cellIndex}
                  className={`text-md text-black dark:text-white font-normal py-2 pl-0 pr-4 border-b border-[#E5E7EB] dark:border-[#262626] ${cellIndex === 0 ? 'text-left w-[60%]' : 'text-center'}`}
                >
                  { cell.content }
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CompareVersionsDataTable;