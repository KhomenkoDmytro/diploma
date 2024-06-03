import React, { useState, useEffect } from 'react';
import Modal from 'react-modal';
import style from './UpdateDecreeModal.module.scss';

Modal.setAppElement('#root');

const UpdateDecreeModal = ({ isOpen, onClose, decree, onUpdate }) => {
  const [formData, setFormData] = useState({
    number: '',
    name: '',
    date: '',
    url: '',
    type: 'загальний'
  });

  useEffect(() => {
    if (decree) {
      setFormData({
        number: decree.number,
        name: decree.name,
        date: new Date(decree.date).toISOString().split('T')[0],
        url: decree.url,
        type: decree.type
      });
    }
  }, [decree]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onUpdate(decree.id, formData);
    onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onClose}
      contentLabel="Update Decree"
      className={style.modal}
      overlayClassName={style.overlay}
    >
      <h2>Оновлення наказу</h2>
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
          URL:
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
          <button type="submit">Оновити</button>
          <button type="button" onClick={onClose}>Відмінити</button>
        </div>
      </form>
    </Modal>
  );
};

export default UpdateDecreeModal;
