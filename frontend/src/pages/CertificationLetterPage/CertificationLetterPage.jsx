import React, { useState, useEffect } from 'react';
import styles from './CertificationLetterPage.module.scss';
import { useAuth } from '../../context/AuthContext';
import StyledHeading from '../../components/Heading/StyledHeading';

const CertificationLettersPage = () => {
  const { institutionId } = useAuth(); // Отримання institutionId з контексту (дужки для виклику функції)
  const [searchTerm, setSearchTerm] = useState('');
  const [letters, setLetters] = useState([]);
  const [sortConfig, setSortConfig] = useState({ key: 'id', direction: 'ascending' });

  useEffect(() => {
    const fetchLetters = async () => {
      try {
        const response = await fetch(`http://localhost:3000/institutions/${institutionId}/certification-letters`);
        const data = await response.json();
        console.log(data);
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
    letter.employee.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    letter.employee.lastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    letter.employee.patronymic.toLowerCase().includes(searchTerm.toLowerCase()) ||
    letter.previousRank.toLowerCase().includes(searchTerm.toLowerCase()) ||
    letter.currentRank.toLowerCase().includes(searchTerm.toLowerCase()) ||
    letter.jobTitle.toLowerCase().includes(searchTerm.toLowerCase()) ||
    letter.subject.toLowerCase().includes(searchTerm.toLowerCase()) ||
    letter.issuanceDate.includes(searchTerm) ||
    letter.note.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className={styles.container}>
      <StyledHeading text="Атестаційні листи"></StyledHeading>
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
            <th onClick={() => requestSort('employee')}>Співробітник</th>
            <th onClick={() => requestSort('previousRank')}>Попередній результат (звання)</th>
            <th onClick={() => requestSort('currentRank')}>Результат (звання)</th>
            <th onClick={() => requestSort('issuanceDate')}>Дата проходження</th>
            <th onClick={() => requestSort('jobTitle')}>Посада</th>
            <th onClick={() => requestSort('subject')}>Предмет</th>
            <th>Примітка</th>
            <th>Дії</th>
          </tr>
        </thead>
        <tbody>
          {filteredLetters.map((letter, index) => (
            <tr key={letter.id}>
              <td>{index + 1}</td>
              <td>{`${letter.employee.lastName} ${letter.employee.firstName} ${letter.employee.patronymic}`}</td>
              <td>{letter.previousRank}</td>
              <td>{letter.currentRank}</td>
              <td>{new Date(letter.issuanceDate).toLocaleDateString()}</td>
              <td>{letter.jobTitle}</td>
              <td>{letter.subject}</td>
              <td>{letter.note}</td>
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

export default CertificationLettersPage;
