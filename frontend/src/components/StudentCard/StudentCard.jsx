import React from 'react';
import PropTypes from 'prop-types';
import style from './StudentCard.module.scss';

const StudentCard = ({ student, onDelete, onUpdate, onView }) => (
  <div className={style.card}>
    <img src="https://via.placeholder.com/150x100" alt="Student" className={style.photo} />
    <div className={style.info}>
      <h3>{student.firstName} {student.lastName}</h3>
      <p>Ідентифікаційний номер: {student.identificationNumber}</p>
      <p>Телефон: {student.phoneNumber}</p>
      <p>Email: {student.email || 'Немає'}</p>
      <div className={style.actions}>
        <button onClick={() => onView(student.id)}>Переглянути</button>
        <button onClick={() => onUpdate(student)}>Оновити</button>
        <button onClick={() => onDelete(student.id)}>Видалити</button>
      </div>
    </div>
  </div>
);

StudentCard.propTypes = {
  student: PropTypes.shape({
    id: PropTypes.number.isRequired,
    firstName: PropTypes.string.isRequired,
    lastName: PropTypes.string.isRequired,
    identificationNumber: PropTypes.string.isRequired,
    phoneNumber: PropTypes.string.isRequired,
    email: PropTypes.string,
  }).isRequired,
  onDelete: PropTypes.func.isRequired,
  onUpdate: PropTypes.func.isRequired,
  onView: PropTypes.func.isRequired,
};

export default StudentCard;
