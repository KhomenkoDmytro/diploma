import React, { useState, useEffect } from 'react';
import styles from './CompetitionsPage.module.scss'; // Підключаємо файли зі стилями
import { useAuth } from '../../context/AuthContext';
import CreateCompetitionModal from '../../components/CreateCompetitionModal/CreateCompetitionModal';
import StyledHeading from '../../components/Heading/StyledHeading';

const CompetitionsPage = () => {
  const { institutionId } = useAuth();
  const [competitions, setCompetitions] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false); // Стан для відображення модального вікна додавання конкурсу

  useEffect(() => {
    fetchCompetitions(institutionId);
    console.log(competitions)
  }, [institutionId]);

  const fetchCompetitions = async (id) => {
    try {
      const response = await fetch(`http://localhost:3000/institutions/${id}/competitions`);
      const data = await response.json();
      console.log('data',data);
      setCompetitions(data); // Зберігаємо отримані дані в стані компонента
      console.log(competitions);
    } catch (error) {
      console.error('Помилка завантаження конкурсів:', error);
    }
  };

  const handleUpdateCompetition = async (id) => {
    try {
      // Виконуємо запит на оновлення конкурсу за його ID
      const response = await fetch(`http://localhost:3000/competitions/${id}`, {
        method: 'PUT', // Використовуємо метод PUT для оновлення
        headers: {
          'Content-Type': 'application/json'
        },
        // Можна передати дані, які потрібно оновити у форматі JSON
        body: JSON.stringify({ /* оновлені дані конкурсу */ })
      });
  
      if (response.ok) {
        console.log(`Конкурс з ID ${id} успішно оновлено.`);
        // Оновлюємо список конкурсів після успішного оновлення
        fetchCompetitions(institutionId);
      } else {
        console.error('Помилка при оновленні конкурсу');
      }
    } catch (error) {
      console.error('Помилка при відправленні запиту на оновлення конкурсу:', error);
    }
  };
  
  const handleDeleteCompetition = async (id) => {
    try {
      // Виконуємо запит на видалення конкурсу за його ID
      const response = await fetch(`http://localhost:3000/competitions/${id}`, {
        method: 'DELETE' // Використовуємо метод DELETE для видалення
      });
  
      if (response.ok) {
        console.log(`Конкурс з ID ${id} успішно видалено.`);
        // Оновлюємо список конкурсів після успішного видалення
        fetchCompetitions(institutionId);
      } else {
        console.error('Помилка при видаленні конкурсу');
      }
    } catch (error) {
      console.error('Помилка при відправленні запиту на видалення конкурсу:', error);
    }
  };
  

  const handleAddCompetition = () => {
    setIsModalOpen(true); // При натисканні кнопки "Додати" відкриваємо модальне вікно
  };
  
  const handleCreateCompetition = async (newCompetitionData) => {
    try {
      const response = await fetch('http://localhost:3000/competitions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({...newCompetitionData, institutionId})
      });
  
      if (response.ok) {
        // Після успішного створення конкурсу оновлюємо список конкурсів
        fetchCompetitions(institutionId);
        // Закриваємо модальне вікно після успішного створення
        setIsModalOpen(false);
        console.log(competitions);
      } else {
        console.error('Помилка при створенні конкурсу');
      }
    } catch (error) {
      console.error('Помилка при відправленні запиту на створення конкурсу:', error);
    }
  };
  

  return (
    <div className={styles.container}>
      <StyledHeading text="Конкурси" />
      <button className={styles.addButton} onClick={handleAddCompetition}>Додати</button>
      <table className={styles.competitionsTable}>
        <thead>
          <tr>
            <th>Назва</th>
            <th>Опис</th>
            <th>Дата</th>
            <th>Результат</th>
            <th>Тип</th>
            <th>Учасник</th>
            <th>Викладач</th>
            <th>Дії</th>
          </tr>
        </thead>
        <tbody>
          {competitions.map(competition => (
            
            <tr key={competition.id}>
              <td>{competition.title}</td>
              <td>{competition.description}</td>
              <td>{competition.date}</td>
              <td>{competition.result}</td>
              <td>{competition.competitionType}</td>
              <td>{competition.student?.firstName} {competition.student?.lastName}</td>
              <td>{competition.teacher?.lastName} {competition.teacher?.firstName} {competition.teacher?.patronymic}</td>
              <td>
                <button className={styles.updateButton} onClick={() => handleUpdateCompetition(competition.id)}>Оновити</button>
                <button className={styles.deleteButton} onClick={() => handleDeleteCompetition(competition.id)}>Видалити</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <CreateCompetitionModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} onCreate={handleCreateCompetition}/> {/* Відображення модального вікна */}
    </div>
  );
};

export default CompetitionsPage;
