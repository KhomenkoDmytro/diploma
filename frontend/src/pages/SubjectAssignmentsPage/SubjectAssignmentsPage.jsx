import React, { useState, useEffect, useMemo } from 'react';
import { useTable, useSortBy, useGlobalFilter } from 'react-table';
import CreateSubjectAssignmentModal from '../../components/CreateSubjectAssignmentModal/CreateSubjectAssignmentModal';
import style from './SubjectAssignmentsPage.module.scss';

// Глобальний фільтр для здійснення пошуку за всіма полями
const GlobalFilter = ({ globalFilter, setGlobalFilter }) => (
  <span>
    Пошук:{' '}
    <input
      value={globalFilter || ''}
      onChange={e => setGlobalFilter(e.target.value)}
      placeholder="Введіть ключові слова..."
      className={style.searchInput}
    />
  </span>
);

const SubjectAssignmentsPage = () => {
  const [subjectAssignments, setSubjectAssignments] = useState([]);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);

  useEffect(() => {
    fetchSubjectAssignments();
  }, []);

  const fetchSubjectAssignments = async () => {
    try {
      const response = await fetch('http://localhost:3000/subject-assignments');
      const data = await response.json();
      setSubjectAssignments(data);
    } catch (error) {
      console.error('Помилка завантаження призначень предметів:', error);
    }
  };

  const handleAddSubjectAssignment = async (newAssignment) => {
    try {
      await fetch('http://localhost:3000/subject-assignments', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(newAssignment)
      });
      fetchSubjectAssignments();
    } catch (error) {
      console.error('Помилка створення призначення предмету:', error);
    }
  };

  const columns = useMemo(() => [
    {
      Header: "Викладач",
      accessor: "teacher",
      Cell: ({ value }) =>
        `${value.lastName} ${value.firstName} ${value.patronymic || ""}`,
      filter: "includes",
    },
    {
      Header: "Учень",
      accessor: "student",
      Cell: ({ value }) =>
        `${value.lastName} ${value.firstName} ${value.patronymic || ""}`,
      filter: "includes",
    },
    {
      Header: "Предмет",
      accessor: "subject.name",
      filter: "includes",
    },
    {
      Header: "Статус",
      accessor: "status",
      filter: "includes",
    },
  ], []);

  const data = useMemo(() => subjectAssignments, [subjectAssignments]);

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
    setGlobalFilter,
    state: { globalFilter }
  } = useTable({ columns, data, globalFilter: (rows, columnIds, filterValue) => {
    if (filterValue === "") {
      return rows;
    }
    const searchString = filterValue.toLowerCase();
    return rows.filter(row =>
      columnIds.some(columnId => {
        const cellValue = row.values[columnId];
        if (typeof cellValue === "string") {
          return cellValue.toLowerCase().includes(searchString);
        } else if (typeof cellValue === "object" && cellValue !== null) {
          return Object.values(cellValue)
            .join(" ")
            .toLowerCase()
            .includes(searchString);
        }
        return false;
      })
    );
  } }, useGlobalFilter, useSortBy);

  return (
    <div className={style.wrapper}>
      <h2>Призначення предметів</h2>
      <div className={style.buttonGroup}>
        <button onClick={() => setIsCreateModalOpen(true)}>Додати</button>
        <GlobalFilter globalFilter={globalFilter} setGlobalFilter={setGlobalFilter} />
      </div>
      <p className={style.resultsCount}>Знайдено: {rows.length}</p>
      <CreateSubjectAssignmentModal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
        onCreate={handleAddSubjectAssignment}
      />
      <table {...getTableProps()} className={style.table}>
        <thead>
          {headerGroups.map(headerGroup => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map(column => (
                <th {...column.getHeaderProps(column.getSortByToggleProps())}>
                  {column.render('Header')}
                  <span>
                    {column.isSorted
                      ? column.isSortedDesc
                        ? ' 🔽'
                        : ' 🔼'
                      : ''}
                  </span>
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {rows.map(row => {
            prepareRow(row)
            return (
              <tr {...row.getRowProps()}>
                {row.cells.map(cell => {
                  return (
                    <td {...cell.getCellProps()}>{cell.render('Cell')}</td>
                  )
                })}
              </tr>
            )
          })}
        </tbody>
      </table>
    </div>
  );
};

export default SubjectAssignmentsPage;
