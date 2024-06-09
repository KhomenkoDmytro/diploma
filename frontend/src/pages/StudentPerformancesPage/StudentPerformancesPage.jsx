import React, { useState, useEffect } from 'react';
import styles from './StudentPerformancesPage.module.scss';
import { useAuth } from '../../context/AuthContext';
import StyledHeading from '../../components/Heading/StyledHeading';

const StudentPerformancesPage = () => {
  const { institutionId } = useAuth();
  const [performances, setPerformances] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortConfig, setSortConfig] = useState({ key: 'id', direction: 'ascending' });

  useEffect(() => {
    const fetchPerformances = async () => {
      try {
        const response = await fetch(`http://localhost:3000/institutions/${institutionId}/student-performances`);
        const data = await response.json();
        setPerformances(data);
      } catch (error) {
        console.error('Помилка завантаження виступів:', error);
      }
    };

    if (institutionId) {
      fetchPerformances();
    }
  }, [institutionId]);

  const sortedPerformances = React.useMemo(() => {
    let sortablePerformances = [...performances];
    sortablePerformances.sort((a, b) => {
      if (a[sortConfig.key] < b[sortConfig.key]) {
        return sortConfig.direction === 'ascending' ? -1 : 1;
      }
      if (a[sortConfig.key] > b[sortConfig.key]) {
        return sortConfig.direction === 'ascending' ? 1 : -1;
      }
      return 0;
    });
    return sortablePerformances;
  }, [performances, sortConfig]);

  const requestSort = (key) => {
    let direction = 'ascending';
    if (sortConfig.key === key && sortConfig.direction === 'ascending') {
      direction = 'descending';
    }
    setSortConfig({ key, direction });
  };

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const filteredPerformances = sortedPerformances.filter((performance) =>
    performance.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
    performance.level.toLowerCase().includes(searchTerm.toLowerCase()) ||
    performance.student.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    performance.student.lastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    performance.teacher.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    performance.teacher.lastName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className={styles.container}>
      <StyledHeading text="Виступи учнів"></StyledHeading>
      <div className={styles.controls}>
        <input
          type="text"
          placeholder="Пошук..."
          value={searchTerm}
          onChange={handleSearch}
          className={styles.searchInput}
        />
        <button className={styles.addButton}>Додати</button>
      </div>
      <table className={styles.table}>
        <thead>
          <tr>
            <th>#</th>
            <th onClick={() => requestSort('description')}>Опис</th>
            <th onClick={() => requestSort('level')}>Рівень</th>
            <th onClick={() => requestSort('date')}>Дата</th>
            <th onClick={() => requestSort('student')}>Учень</th>
            <th onClick={() => requestSort('teacher')}>Викладач</th>
            <th>Дії</th>
          </tr>
        </thead>
        <tbody>
          {filteredPerformances.map((performance, index) => (
            <tr key={performance.id}>
              <td>{index + 1}</td>
              <td>{performance.description}</td>
              <td>{performance.level}</td>
              <td>{new Date(performance.date).toLocaleDateString()}</td>
              <td>{`${performance.student.firstName} ${performance.student.lastName}`}</td>
              <td>{`${performance.teacher.firstName} ${performance.teacher.lastName}`}</td>
              <td>
                <button className={styles.updateButton}>Оновити</button>
                <button className={styles.deleteButton}>Видалити</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default StudentPerformancesPage;
