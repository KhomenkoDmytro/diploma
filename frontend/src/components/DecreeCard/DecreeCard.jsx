import React from 'react';
import PropTypes from 'prop-types';
import style from './DecreeCard.module.scss';

const DecreeCard = ({ decree, onUpdate, onDelete }) => (
  <div className={style.card}>
    <div className={style.details}>
      <p className={style.number}>Номер: {decree.number} ({decree.type})</p>
      <p className={style.name}>Назва: {decree.name}</p>
      <p className={style.date}>Дата видання: {new Date(decree.date).toLocaleDateString()}</p>
      <a href={decree.url} className={style.link} target="_blank" rel="noopener noreferrer">Посилання на документ .docx</a>
    </div>
    <div className={style.actions}>
      <button onClick={() => onUpdate(decree)}>Оновити</button>
      <button onClick={() => onDelete(decree.id)} className={style.deleteButton}>Видалити</button>
    </div>
  </div>
);

DecreeCard.propTypes = {
  decree: PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    number: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
    date: PropTypes.string.isRequired,
    url: PropTypes.string.isRequired,
  }).isRequired,
  onUpdate: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
};

export default DecreeCard;
