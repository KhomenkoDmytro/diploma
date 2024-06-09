import React, { useState, useEffect, useContext } from 'react';
import styles from './LettersPage.module.scss';
import { useAuth } from '../../context/AuthContext';
import StyledHeading from '../../components/Heading/StyledHeading';

const LettersPage = () => {
  const { institutionId } = useAuth();
  const [searchTerm, setSearchTerm] = useState('');
  const [letters, setLetters] = useState([]);
  const [sortConfig, setSortConfig] = useState({ key: 'id', direction: 'ascending' });

  useEffect(() => {
    const fetchLetters = async () => {
      try {
        const response = await fetch(`http://localhost:3000/institutions/${institutionId}/letters`);
        const data = await response.json();
        setLetters(data);
      } catch (error) {
        console.error("Error fetching data", error);
      }
    };

    if (institutionId) {
      fetchLetters();
    }
  }, [institutionId]);

  const sortedLetters = React.useMemo(() => {
    let sortableLetters = [...letters];
    sortableLetters.sort((a, b) => {
      if (a[sortConfig.key] < b[sortConfig.key]) {
        return sortConfig.direction === 'ascending' ? -1 : 1;
      }
      if (a[sortConfig.key] > b[sortConfig.key]) {
        return sortConfig.direction === 'ascending' ? 1 : -1;
      }
      return 0;
    });
    return sortableLetters;
  }, [letters, sortConfig]);

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

  const filteredLetters = sortedLetters.filter((letter) =>
    letter.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className={styles.container}>
      <StyledHeading text="Листи"></StyledHeading>
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
            <th onClick={() => requestSort('number')}>Номер</th>
            <th onClick={() => requestSort('name')}>Назва</th>
            <th onClick={() => requestSort('date')}>Дата</th>
            <th onClick={() => requestSort('whom')}>Кому</th>
            <th onClick={() => requestSort('url')}>URL</th>
            <th>Дії</th>
          </tr>
        </thead>
        <tbody>
          {filteredLetters.map((letter, index) => (
            <tr key={letter.id}>
              <td>{index + 1}</td>
              <td>{letter.number}</td>
              <td>{letter.name}</td>
              <td>{new Date(letter.date).toLocaleDateString()}</td>
              <td>{letter.whom}</td>
              <td><a href={letter.url} target="_blank" rel="noopener noreferrer">Посилання</a></td>
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

export default LettersPage;
