import React, { useState, useEffect, useMemo } from 'react';
import { useTable, useSortBy, useGlobalFilter } from 'react-table';
import style from './DecreesPage.module.scss';
import CreateDecreeModal from '../../components/CreateDecreeModal/CreateDecreeModal';
import UpdateDecreeModal from '../../components/UpdateDecreeModal/UpdateDecreeModal';
import documentIcon from '../img/audit.png';
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

const DecreesPage = () => {
  const [decrees, setDecrees] = useState([]);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
  const [selectedDecree, setSelectedDecree] = useState(null);

  useEffect(() => {
    fetchDecrees();
  }, []);

  const fetchDecrees = async () => {
    try {
      const response = await fetch('http://localhost:3000/decrees');
      const data = await response.json();
      setDecrees(data);
    } catch (error) {
      console.error('Помилка завантаження декретів:', error);
    }
  };

  const handleAddDecree = async (newDecree) => {
    try {
      await fetch('http://localhost:3000/decrees', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(newDecree)
      });
      fetchDecrees();
    } catch (error) {
      console.error('Помилка створення декрету:', error);
    }
  };

  const handleUpdateDecree = async (updatedDecree) => {
    try {
      await fetch(`http://localhost:3000/decrees/${updatedDecree.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(updatedDecree)
      });
      fetchDecrees();
    } catch (error) {
      console.error('Помилка оновлення декрету:', error);
    }
  };

  const handleDeleteDecree = async (id) => {
    try {
      await fetch(`http://localhost:3000/decrees/${id}`, {
        method: 'DELETE',
      });
      fetchDecrees();
    } catch (error) {
      console.error('Помилка видалення декрету:', error);
    }
  };

  const openUpdateModal = (decree) => {
    setSelectedDecree(decree);
    setIsUpdateModalOpen(true);
  };

  const columns = useMemo(() => [
    {
      Header: '№',
      accessor: (_, index) => index + 1,
      disableSortBy: true,
      disableFilters: true,
    },
    {
      Header: 'Номер',
      accessor: 'number',
      filter: 'includes',
    },
    {
      Header: 'Назва',
      accessor: 'name',
      filter: 'includes',
    },
    {
      Header: 'Тип',
      accessor: 'type',
      filter: 'includes',
    },
    {
      Header: 'Дата видання',
      accessor: 'date',
      Cell: ({ value }) => new Date(value).toLocaleDateString(),
      filter: 'includes',
    },
    {
      Header: 'URL',
      accessor: 'url',
      Cell: ({ value }) => (
        <a href={value} target="_blank" rel="noopener noreferrer">
          <img src={documentIcon} alt="document icon" className={style.icon} />
        </a>
      ),
      filter: 'includes',
    },
    {
      Header: 'Дії',
      accessor: 'actions',
      Cell: ({ row }) => (
        <div className={style.actions}>
          <button onClick={() => openUpdateModal(row.original)} className={style.updateButton}>Оновити</button>
          <button onClick={() => handleDeleteDecree(row.original.id)} className={style.deleteButton}>Видалити</button>
        </div>
      ),
      disableSortBy: true,
      disableFilters: true,
    }
  ], []);

  const data = useMemo(() => decrees, [decrees]);

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
      <h2>Накази</h2>
      <div className={style.buttonGroup}>
        <button onClick={() => setIsCreateModalOpen(true)}>Додати</button>
        <GlobalFilter globalFilter={globalFilter} setGlobalFilter={setGlobalFilter} />
      </div>
      <p className={style.resultsCount}>Знайдено: {rows.length}</p>
      {<CreateDecreeModal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
        onCreate={handleAddDecree}
      />}
      {selectedDecree && (
        <UpdateDecreeModal
          isOpen={isUpdateModalOpen}
          onClose={() => setIsUpdateModalOpen(false)}
          decree={selectedDecree}
          onUpdate={handleUpdateDecree}
        />
      )}
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

export default DecreesPage;
