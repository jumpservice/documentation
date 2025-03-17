import React from 'react';

interface TableProps {
  headers: string[];
  rows: Array<Array<{ content: string; link?: string }>>;
}

const DataTable: React.FC<TableProps> = ({ headers, rows }) => {
  return (
    <div className="overflow-x-auto mt-5">
      <table className="min-w-full table-auto border-collapse border border-gray-300 rounded-lg">
        <thead>
          <tr className="bg-gray-100 text-left text-sm font-bold">
            {headers.map((header, index) => (
              <th key={index} className="py-3 px-4 border-b border-gray-300 font-semibold">
                {header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, rowIndex) => (
            <tr key={rowIndex} className="even:bg-gray-50 hover:bg-gray-100">
              {row.map((cell, cellIndex) => (
                <td key={cellIndex} className="py-2 px-4 border-b border-gray-200">
                  {cell.link ? (
                    <a
                      href={cell.link}
                      className="text-primary hover:underline"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {cell.content}
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
