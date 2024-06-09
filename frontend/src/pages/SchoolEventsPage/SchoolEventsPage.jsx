import React, { useState, useEffect } from 'react';
import styles from './SchoolEventsPage.module.scss';
import { useAuth } from '../../context/AuthContext';
import StyledHeading from '../../components/Heading/StyledHeading';

const SchoolEventsPage = () => {
  const { institutionId } = useAuth(); // Отримання institutionId з контексту
  const [events, setEvents] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortConfig, setSortConfig] = useState({ key: 'id', direction: 'ascending' });

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await fetch(`http://localhost:3000/institutions/${institutionId}/events`);
        const data = await response.json();
        console.log(data);
        setEvents(data);
      } catch (error) {
        console.error("Error fetching data", error);
      }
    };

    if (institutionId) {
      fetchEvents();
    }
  }, [institutionId]);

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const filteredEvents = events.filter(event =>
    event.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    event.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
    event.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
    event.type.toLowerCase().includes(searchTerm.toLowerCase()) ||
    event.level.toLowerCase().includes(searchTerm.toLowerCase()) ||
    event.organizers.some(organizer =>
      organizer.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      organizer.lastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      organizer.patronymic.toLowerCase().includes(searchTerm.toLowerCase())
    )
  );

  const requestSort = (key) => {
    let direction = 'ascending';
    if (sortConfig.key === key && sortConfig.direction === 'ascending') {
      direction = 'descending';
    }
    setSortConfig({ key, direction });

    const sortedData = [...filteredEvents].sort((a, b) => {
      if (a[key] < b[key]) return direction === 'ascending' ? -1 : 1;
      if (a[key] > b[key]) return direction === 'ascending' ? 1 : -1;
      return 0;
    });

    setEvents(sortedData);
  };

  const handleAdd = () => {
    // Логіка для додавання заходу
  };

  const handleUpdate = (id) => {
    // Логіка для оновлення заходу
  };

  const handleDelete = (id) => {
    // Логіка для видалення заходу
  };

  return (
    <div className={styles.container}>
      <StyledHeading text="Шкільні заходи"></StyledHeading>
      <div className={styles.controls}>
        <input
          type="text"
          placeholder="Пошук..."
          value={searchTerm}
          onChange={handleSearch}
          className={styles.searchInput}
        />
        <button onClick={handleAdd} className={styles.addButton}>Додати</button>
      </div>
      <table className={styles.table}>
        <thead>
          <tr>
            <th>#</th>
            <th onClick={() => requestSort('title')}>Назва</th>
            <th onClick={() => requestSort('description')}>Опис</th>
            <th onClick={() => requestSort('date')}>Дата</th>
            <th onClick={() => requestSort('location')}>Локація</th>
            <th onClick={() => requestSort('type')}>Тип</th>
            <th onClick={() => requestSort('level')}>Рівень</th>
            <th onClick={() => requestSort('isActive')}>Проведено</th>
            <th>Організатори</th>
            <th>Дії</th>
          </tr>
        </thead>
        <tbody>
          {filteredEvents.map((event, index) => (
            <tr key={event.id}>
              <td>{index + 1}</td>
              <td>{event.title}</td>
              <td>{event.description}</td>
              <td>{new Date(event.date).toLocaleDateString()}</td>
              <td>{event.location}</td>
              <td>{event.type}</td>
              <td>{event.level}</td>
              <td>{event.isActive ? 'Так' : 'Ні'}</td>
              <td>
                {event.organizers.map((organizer) => (
                  <div key={organizer.id}>
                    {organizer.lastName} {organizer.firstName} {organizer.patronymic}
                  </div>
                ))}
              </td>
              <td>
                <button onClick={() => handleUpdate(event.id)} className={styles.updateButton}>Оновити</button>
                <button onClick={() => handleDelete(event.id)} className={styles.deleteButton}>Видалити</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default SchoolEventsPage;
