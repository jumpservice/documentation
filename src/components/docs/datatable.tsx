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
}

const DataTable: React.FC<TableProps> = ({ headers, rows }) => {
  const resolvedRows = typeof rows === 'function' ? rows() : rows;

  return (
    <div className="overflow-x-auto text-[14px] mt-5">
      <table className="min-w-full text-center table-auto border-collapse rounded-lg">
        <thead>
          <tr className="text-center font-bold text-black dark:text-white">
            {headers.map((header, index) => (
              <th
                key={index}
                className="py-3 px-4 border-b border-[#E5E7EB] dark:border-[#262626] font-semibold"
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
                  className="py-2 text-black dark:text-white px-4 border-b border-[#E5E7EB] dark:border-[#262626]"
                >
                  {cell.link ? (
                    <a
                      href={cell.link}
                      className=""
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {cell.content} {cell.linkIcon === false ? null : <Icon name="link" /> }
                    </a>
                  ) : (
                    cell.content
                  )}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default DataTable;