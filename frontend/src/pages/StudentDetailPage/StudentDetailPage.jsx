import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import style from './StudentDetailPage.module.scss';

const StudentDetailPage = () => {
  const { id } = useParams();
  const [student, setStudent] = useState(null);

  useEffect(() => {
    fetchStudent();
  }, [id]);

  const fetchStudent = async () => {
    try {
      const response = await fetch(`http://localhost:3000/students/${id}`);
      const data = await response.json();
      setStudent(data);
    } catch (error) {
      console.error('Error fetching student:', error);
    }
  };

  if (!student) {
    return <div>Loading...</div>;
  }

  return (
    <div className={style.wrapper}>
      <h2>{student.firstName} {student.lastName}</h2>
      <div className={style.details}>
        <div className={style.info}>
          <p><strong>Ідентифікаційний номер:</strong> {student.identificationNumber}</p>
          <p><strong>Телефон:</strong> {student.phoneNumber}</p>
          <p><strong>Email:</strong> {student.email || 'Немає'}</p>
          <p><strong>Стать:</strong> {student.gender || 'Немає'}</p>
          <p><strong>Дата народження:</strong> {new Date(student.birthDate).toLocaleDateString()}</p>
          <p><strong>Дата початку навчання:</strong> {new Date(student.startDate).toLocaleDateString()}</p>
          <p><strong>Дата закінчення навчання:</strong> {student.endDate ? new Date(student.endDate).toLocaleDateString() : 'Немає'}</p>
          <p><strong>Адреса проживання:</strong> {student.residenceAddress || 'Немає'}</p>
          <p><strong>Фактична адреса:</strong> {student.actualAddress || 'Немає'}</p>
        </div>
        <img src="https://via.placeholder.com/240x320" alt="Student" className={style.photo} />
      </div>
    </div>
  );
};

export default StudentDetailPage;
