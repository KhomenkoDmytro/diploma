import React, { useEffect, useState } from 'react';
import TopsisResultsTable from '../../components/TopsisResultsTable/TopsisResultsTable';
import { useAuth } from '../../context/AuthContext';
import StyledHeading from '../../components/Heading/StyledHeading';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import styles from './TopsisResultsPage.module.scss';

const TopsisResultsPage = () => {
  const [data, setData] = useState([]);
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const { institutionId } = useAuth();

  const fetchData = async () => {
    try {
      const response = await fetch('http://localhost:3000/topsis', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          institutionId,
          startDate: startDate ? startDate.toISOString().split('T')[0] : undefined,
          endDate: endDate ? endDate.toISOString().split('T')[0] : undefined,
        }),
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const responseData = await response.json();
      setData(responseData);
    } catch (error) {
      console.error('Error fetching Topsis results:', error);
    }
  };

  useEffect(() => {
    if (institutionId) {
      fetchData();
    }
  }, [institutionId]);

  return (
    <div className={styles.container}>
      <StyledHeading text="Аналітика роботи викладачів" />
      <div className={styles.datePickerContainer}>
        <DatePicker
          selected={startDate}
          onChange={(date) => setStartDate(date)}
          selectsStart
          startDate={startDate}
          endDate={endDate}
          placeholderText="Виберіть початкову дату"
          className={styles.datePicker}
        />
        <DatePicker
          selected={endDate}
          onChange={(date) => setEndDate(date)}
          selectsEnd
          startDate={startDate}
          endDate={endDate}
          minDate={startDate}
          placeholderText="Виберіть кінцеву дату"
          className={styles.datePicker}
        />
        <button onClick={fetchData} className={styles.filterButton}>
          Провести аналіз
        </button>
      </div>
      <TopsisResultsTable data={data} />
    </div>
  );
};

export default TopsisResultsPage;
