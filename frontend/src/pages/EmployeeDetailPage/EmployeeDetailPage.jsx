import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import style from './EmployeeDetailPage.module.scss';

const EmployeeDetailPage = () => {
  const { id } = useParams();
  const [employee, setEmployee] = useState(null);

  useEffect(() => {
    fetchEmployee();
  }, [id]);

  const fetchEmployee = async () => {
    try {
      const response = await fetch(`http://localhost:3000/employees/${id}`);
      const data = await response.json();
      setEmployee(data);
    } catch (error) {
      console.error('Error fetching employee:', error);
    }
  };

  if (!employee) {
    return <div>Loading...</div>;
  }

  return (
    <div className={style.wrapper}>
      <h2>{employee.firstName} {employee.lastName}</h2>
      <div className={style.details}>
        <div className={style.info}>
          <p><strong>Посада:</strong> {employee.position}</p>
          <p><strong>Телефон:</strong> {employee.phoneNumber}</p>
          <p><strong>Email:</strong> {employee.email || 'Немає'}</p>
          <p><strong>Стать:</strong> {employee.gender || 'Немає'}</p>
          <p><strong>Тип зайнятості:</strong> {employee.employmentType}</p>
          <p><strong>Дата народження:</strong> {new Date(employee.birthDate).toLocaleDateString()}</p>
          <p><strong>Дата початку роботи:</strong> {new Date(employee.startDate).toLocaleDateString()}</p>
          <p><strong>Дата закінчення роботи:</strong> {employee.endDate ? new Date(employee.endDate).toLocaleDateString() : 'Немає'}</p>
          <p><strong>Ідентифікаційний номер:</strong> {employee.identificationNumber}</p>
          <p><strong>Адреса проживання:</strong> {employee.residenceAddress || 'Немає'}</p>
          <p><strong>Фактична адреса:</strong> {employee.actualAddress || 'Немає'}</p>
        </div>
        <img src="https://via.placeholder.com/240x320" alt="Employee" className={style.photo} />
      </div>
    </div>
  );
};

export default EmployeeDetailPage;
