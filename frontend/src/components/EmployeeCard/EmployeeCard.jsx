import React from 'react';
import PropTypes from 'prop-types';
import style from './EmployeeCard.module.scss';

const EmployeeCard = ({ employee, onDelete, onUpdate, onView }) => (
  <div className={style.card}>
    <img src="https://via.placeholder.com/150x100" alt="Employee" className={style.photo} />
    <div className={style.info}>
      <h3>{employee.firstName} {employee.lastName}</h3>
      <p>Посада: {employee.position}</p>
      <p>Телефон: {employee.phoneNumber}</p>
      <p>Email: {employee.email || 'Немає'}</p>
      <div className={style.actions}>
        <button onClick={() => onView(employee.id)}>Переглянути</button>
        <button onClick={() => onUpdate(employee)}>Оновити</button>
        <button onClick={() => onDelete(employee.id)}>Видалити</button>
      </div>
    </div>
  </div>
);

EmployeeCard.propTypes = {
  employee: PropTypes.shape({
    id: PropTypes.number.isRequired,
    firstName: PropTypes.string.isRequired,
    lastName: PropTypes.string.isRequired,
    position: PropTypes.string.isRequired,
    phoneNumber: PropTypes.string.isRequired,
    email: PropTypes.string,
  }).isRequired,
  onDelete: PropTypes.func.isRequired,
  onUpdate: PropTypes.func.isRequired,
  onView: PropTypes.func.isRequired,
};

export default EmployeeCard;
