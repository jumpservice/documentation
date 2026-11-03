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
      <table className="min-w-full text-center table-auto border-collapse rounded-lg border border-hairline dark:border-white/10">
        <thead>
          <tr className="font-bold text-ink dark:text-white">
            {headers.map((header, index) => (
              <th
                key={index}
                className="py-3 border-b border-hairline bg-surface-soft dark:border-white/10 dark:bg-teal-mid/40 font-semibold"
              >
                {header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {resolvedRows.map((row, rowIndex) => (
            <tr className="group">
              {row.map((cell, cellIndex) => (
                <td
                  className="py-2 text-slate dark:text-white/75 group-hover:text-primary"
                >
                  {cell.link ? (
                    <a
                      href={cell.link}
                      className="block w-full h-full group-hover:text-primary"
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