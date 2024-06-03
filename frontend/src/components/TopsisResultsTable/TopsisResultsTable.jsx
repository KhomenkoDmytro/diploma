import React from 'react';
import { useTable, useSortBy } from 'react-table';
import style from './TopsisResultsTable.module.scss';

const TopsisResultsTable = ({ data }) => {
  const columns = React.useMemo(
    () => [
      {
        Header: 'Ім\'я',
        accessor: 'teacherName',
      },
      {
        Header: 'Результати виступів на конкурсах',
        accessor: 'contestScore',
      },
      {
        Header: 'Виступи на публічних заходах',
        accessor: 'performanceScore',
      },
      {
        Header: 'Організованих подій',
        accessor: 'organizedEventsScore',
      },
      {
        Header: 'Наявність скарг',
        accessor: 'complaintsScore',
      },
      {
        Header: 'Показник TOPSIS',
        accessor: 'topsisScore',
        Cell: ({ value }) => {
          const formattedValue = typeof value === 'number' ? value.toFixed(4) : value;
          return <span>{formattedValue}</span>;
        },
      },
    ],
    []
  );

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
  } = useTable({ columns, data }, useSortBy);

  return (
    <table {...getTableProps()} className={style.table}>
      <thead>
        <tr>
          <th>№</th>
          {headerGroups.map(headerGroup => (
            headerGroup.headers.map(column => (
              <th key={column.id} {...column.getHeaderProps(column.getSortByToggleProps())}>
                {column.render('Header')}
                <span>
                  {column.isSorted ? (column.isSortedDesc ? ' 🔽' : ' 🔼') : ''}
                </span>
              </th>
            ))
          ))}
        </tr>
      </thead>
      <tbody {...getTableBodyProps()}>
        {rows.map((row, rowIndex) => {
          prepareRow(row);
          return (
            <tr key={row.id} {...row.getRowProps()}>
              <td>{rowIndex + 1}</td>
              {row.cells.map(cell => (
                <td key={cell.column.id} {...cell.getCellProps()}>{cell.render('Cell')}</td>
              ))}
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};

export default TopsisResultsTable;
