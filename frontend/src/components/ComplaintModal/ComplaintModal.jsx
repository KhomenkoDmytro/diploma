import React, { useState, useEffect } from 'react';
import Modal from 'react-modal';
import styles from './ComplaintModal.module.scss';

const ComplaintModal = ({ isOpen, onClose, onSave, complaint, employees }) => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    date: '',
    status: '',
    url: '',
    firstName: '',
    lastName: '',
    level: '',
    employeeId: null,
  });

  useEffect(() => {
    if (complaint) {
      setFormData({
        title: complaint.title || '',
        description: complaint.description || '',
        date: complaint.date || '',
        status: complaint.status || '',
        url: complaint.url || '',
        firstName: complaint.firstName || '',
        lastName: complaint.lastName || '',
        level: complaint.level || '',
        employeeId: complaint.employee ? complaint.employee.id : null,
      });
    }
  }, [complaint]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleEmployeeChange = (e) => {
    setFormData({
      ...formData,
      employeeId: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formData);
  };

  return (
    <Modal isOpen={isOpen} onRequestClose={onClose} className={styles.modal} overlayClassName={styles.overlay}>
      <h2>{complaint ? 'Оновити скаргу' : 'Додати скаргу'}</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Назва:
          <input type="text" name="title" value={formData.title} onChange={handleChange} required />
        </label>
        <label>
          Опис:
          <input type="text" name="description" value={formData.description} onChange={handleChange} required />
        </label>
        <label>
          Дата:
          <input type="date" name="date" value={formData.date} onChange={handleChange} required />
        </label>
        <label>
          Статус:
          <input type="text" name="status" value={formData.status} onChange={handleChange} required />
        </label>
        <label>
          URL:
          <input type="url" name="url" value={formData.url} onChange={handleChange} required />
        </label>
        <label>
          Складач скарги (Ім'я):
          <input type="text" name="firstName" value={formData.firstName} onChange={handleChange} required />
        </label>
        <label>
          Складач скарги (Прізвище):
          <input type="text" name="lastName" value={formData.lastName} onChange={handleChange} required />
        </label>
        <label>
          Рівень:
          <input type="text" name="level" value={formData.level} onChange={handleChange} required />
        </label>
        <label>
          Працівник:
          <select name="employeeId" value={formData.employeeId} onChange={handleEmployeeChange} required>
            <option value="">Виберіть працівника</option>
            {employees.map((employee) => (
              <option key={employee.id} value={employee.id}>
                {employee.firstName} {employee.lastName}
              </option>
            ))}
          </select>
        </label>
        <button type="submit">{complaint ? 'Оновити' : 'Додати'}</button>
        <button type="button" onClick={onClose}>Скасувати</button>
      </form>
    </Modal>
  );
};

export default ComplaintModal;
