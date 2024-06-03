import React, { useState, useEffect } from 'react';
import Modal from 'react-modal';
import style from './CreateActivityModal.module.scss';

Modal.setAppElement('#root');

const activityTypes = [
  'Виступ учнів на конкурсі',
  'Виступ учнів на фестивалі',
  'Виступ учнів на концерті',
  'Методична доповідь викладачів',
  'Отримання премії',
  'Номінування на премію',
  'Участь у проєкті міста',
  'Участь у проєкті області',
  'Участь у проєкті України'
];

const CreateActivityModal = ({ isOpen, onClose, onCreate }) => {
  const [formData, setFormData] = useState({
    type: '',
    description: '',
    date: '',
    teacherId: '',
    studentId: '',
    awardDetails: '',
  });

  const [teachers, setTeachers] = useState([]);
  const [students, setStudents] = useState([]);

  useEffect(() => {
    fetchTeachers();
    fetchStudents();
  }, []);

  const fetchTeachers = async () => {
    try {
      const response = await fetch('http://localhost:3000/employees');
      const data = await response.json();
      setTeachers(data);
    } catch (error) {
      console.error('Помилка завантаження викладачів:', error);
    }
  };

  const fetchStudents = async () => {
    try {
      const response = await fetch('http://localhost:3000/students');
      const data = await response.json();
      setStudents(data);
    } catch (error) {
      console.error('Помилка завантаження учнів:', error);
    }
  };

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
      contentLabel="Create Activity"
      className={style.modal}
      overlayClassName={style.overlay}
    >
      <h2>Створити Активність</h2>
      <form onSubmit={handleSubmit} className={style.form}>
        <label>
          Тип:
          <select name="type" value={formData.type} onChange={handleChange} required>
            <option value="">Оберіть тип</option>
            {activityTypes.map((type, index) => (
              <option key={index} value={type}>{type}</option>
            ))}
          </select>
        </label>
        <label>
          Опис:
          <textarea name="description" value={formData.description} onChange={handleChange} required />
        </label>
        <label>
          Дата:
          <input type="date" name="date" value={formData.date} onChange={handleChange} required />
        </label>
        <label>
          Викладач:
          <select name="teacherId" value={formData.teacherId} onChange={handleChange}>
            <option value="">Оберіть викладача</option>
            {teachers.map(teacher => (
              <option key={teacher.id} value={teacher.id}>{teacher.lastName} {teacher.firstName}</option>
            ))}
          </select>
        </label>
        <label>
          Учень:
          <select name="studentId" value={formData.studentId} onChange={handleChange}>
            <option value="">Оберіть учня</option>
            {students.map(student => (
              <option key={student.id} value={student.id}>{student.lastName} {student.firstName}</option>
            ))}
          </select>
        </label>
       
        <div className={style.buttonGroup}>
          <button type="submit">Створити</button>
          <button type="button" onClick={onClose}>Скасувати</button>
        </div>
      </form>
    </Modal>
  );
};

export default CreateActivityModal;
