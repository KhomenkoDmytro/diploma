import React, { useState } from 'react';
import Modal from 'react-modal';
import style from './CreateDecreeModal.module.scss';

Modal.setAppElement('#root');

const CreateDecreeModal = ({ isOpen, onClose, onCreate }) => {
  
  const [formData, setFormData] = useState({
    number: '',
    name: '',
    date: '',
    url: '',
    type: 'загальний'
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onCreate(formData);
    onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onClose}
      contentLabel="Create Decree"
      className={style.modal}
      overlayClassName={style.overlay}
    >
      <h2>Створення нового наказу</h2>
      <form onSubmit={handleSubmit} className={style.form}>
        <label>
          Номер:
          <input type="text" name="number" value={formData.number} onChange={handleChange} required />
        </label>
        <label>
          Назва:
          <input type="text" name="name" value={formData.name} onChange={handleChange} required />
        </label>
        <label>
          Дата:
          <input type="date" name="date" value={formData.date} onChange={handleChange} required />
        </label>
        <label>
          Посилання на Google docs:
          <input type="url" name="url" value={formData.url} onChange={handleChange} required />
        </label>
        <label>
          Тип:
          <select name="type" value={formData.type} onChange={handleChange} required>
            <option value="загальний">Загальний</option>
            <option value="кадровий">Кадровий</option>
          </select>
        </label>
        <div className={style.buttonGroup}>
          <button type="submit">Створити</button>
          <button type="button" onClick={onClose}>Відмінити</button>
        </div>
      </form>
    </Modal>
  );
};

export default CreateDecreeModal;
