import React from 'react';
import Icon from './icons';

type TableProps = {
  headers: string[];
  rows: (string | number | boolean)[][];
};

const ResourceAttributeTable: React.FC<TableProps> = ({ headers, rows }) => {
  return (
    <div className="overflow-x-auto text-[14px] w-full mt-10">
      <table className="w-full table-fixed border-collapse">
        <thead>
          <tr className="text-left text-primary">
            {headers.map((header, idx) => (
              <th
                key={idx}
                className={`border dark:border-gray-600 px-4 py-2 break-words ${idx === 0 ? 'w-1/2' : 'w-1/2'}`}
              >
                {header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
        {rows.map((row, rowIdx) => {
          const normalizedRow = row.length < headers.length
            ? row.concat(Array(headers.length - row.length).fill('-'))
            : row.slice(0, headers.length);

          return (
            <tr key={rowIdx} className="text-left">
              {normalizedRow.map((cell, cellIdx) => {
                const raw = String(cell);
                const isRequired = raw.startsWith('*');
                const display = isRequired ? raw.slice(1) : raw;

                return (
                  <td
                    key={cellIdx}
                    className={`border dark:border-gray-600 px-4 py-2 align-top break-words ${cellIdx === 0 ? 'w-1/2' : 'w-1/2'}`}
                  >
                    <span dangerouslySetInnerHTML={{ __html: display }} />
                    {isRequired && <Icon name="*" />}
                  </td>
                );
              })}
            </tr>
          );
        })}
        </tbody>
      </table>
    </div>
  );
};

export default ResourceAttributeTable;