import React, { useState, useEffect, useMemo } from 'react';
import { useTable, useSortBy, useGlobalFilter, useFilters } from 'react-table';
import CreateActivityModal from '../../components/CreateActivityModal/CreateActivityModal';
import UpdateActivityModal from '../../components/UpdateActivityModal/UpdateActivityModal';
import style from './ActivityPage.module.scss';

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

const ActivitiesPage = () => {
  const [activities, setActivities] = useState([]);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
  const [selectedActivity, setSelectedActivity] = useState(null);

  useEffect(() => {
    fetchActivities();
  }, []);

  const fetchActivities = async () => {
    try {
      const response = await fetch('http://localhost:3000/activities');
      const data = await response.json();
      setActivities(data);
    } catch (error) {
      console.error('Помилка завантаження активностей:', error);
    }
  };

  const handleAddActivity = async (newActivity) => {
    try {
      await fetch('http://localhost:3000/activities', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(newActivity)
      });
      fetchActivities();
    } catch (error) {
      console.error('Помилка створення активності:', error);
    }
  };

  const handleUpdateActivity = async (updatedActivity) => {
    try {
      await fetch(`http://localhost:3000/activities/${updatedActivity.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(updatedActivity)
      });
      fetchActivities();
    } catch (error) {
      console.error('Помилка оновлення активності:', error);
    }
  };

  const handleDeleteActivity = async (id) => {
    try {
      await fetch(`http://localhost:3000/activities/${id}`, {
        method: 'DELETE',
      });
      fetchActivities();
    } catch (error) {
      console.error('Помилка видалення активності:', error);
    }
  };

  const openUpdateModal = (activity) => {
    setSelectedActivity(activity);
    setIsUpdateModalOpen(true);
  };

  const columns = useMemo(() => [
    {
      Header: '№',
      accessor: (row, i) => i + 1,
      disableSortBy: true
    },
    {
      Header: 'Тип',
      accessor: 'type'
    },
    {
      Header: 'Опис',
      accessor: 'description'
    },
    {
      Header: 'Дата',
      accessor: 'date',
      Cell: ({ value }) => new Date(value).toLocaleDateString()
    },
    {
      Header: 'Викладач',
      accessor: row => row.teacher ? `${row.teacher.firstName} ${row.teacher.lastName}` : '-:-',
      id: 'teacherName'
    },
    {
      Header: 'Учень',
      accessor: row => row.student ? `${row.student.firstName} ${row.student.lastName}` : '-:-',
      id: 'studentName'
    },
    {
      Header: 'Дії',
      accessor: 'actions',
      Cell: ({ row }) => (
        <div className={style.actions}>
          <button onClick={() => openUpdateModal(row.original)} className={style.updateButton}>Оновити</button>
          <button onClick={() => handleDeleteActivity(row.original.id)} className={style.deleteButton}>Видалити</button>
        </div>
      ),
      disableSortBy: true
    }
  ], []);

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
    state,
    setGlobalFilter
  } = useTable(
    { columns, data: activities },
    useGlobalFilter,
    useSortBy
  );

  return (
    <div className={style.wrapper}>
      <h2>Активності</h2>
      <div className={style.buttonGroup}>
        <button onClick={() => setIsCreateModalOpen(true)} className={style.createButton}>Додати нову активність</button>
        <GlobalFilter globalFilter={state.globalFilter} setGlobalFilter={setGlobalFilter} />
      </div>
      <CreateActivityModal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
        onCreate={handleAddActivity}
      />
      {selectedActivity && (
        <UpdateActivityModal
          isOpen={isUpdateModalOpen}
          onClose={() => setIsUpdateModalOpen(false)}
          activity={selectedActivity}
          onUpdate={handleUpdateActivity}
        />
      )}
      <p className={style.resultsCount}>Знайдено: {rows.length}</p>
      <table {...getTableProps()} className={style.table}>
        <thead>
          {headerGroups.map(headerGroup => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map(column => (
                <th {...column.getHeaderProps(column.getSortByToggleProps())}>
                  {column.render('Header')}
                  <span>
                    {column.isSorted ? (column.isSortedDesc ? ' 🔽' : ' 🔼') : ''}
                  </span>
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {rows.map(row => {
            prepareRow(row);
            return (
              <tr {...row.getRowProps()}>
                {row.cells.map(cell => (
                  <td {...cell.getCellProps()}>{cell.render('Cell')}</td>
                ))}
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default ActivitiesPage;
