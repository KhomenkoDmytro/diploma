import React, { useEffect, useState } from 'react';
import TopsisResultsTable from '../../components/TopsisResultsTable/TopsisResultsTable';

const TopsisResultsPage = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:3000/topsis');
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const responseData = await response.json();
        setData(responseData);
      } catch (error) {
        console.error('Error fetching Topsis results:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      <h2>Результати аналізу TOPSIS</h2>
      <TopsisResultsTable data={data} />
    </div>
  );
};

export default TopsisResultsPage;
