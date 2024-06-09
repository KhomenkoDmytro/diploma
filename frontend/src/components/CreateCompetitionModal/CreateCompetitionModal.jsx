import React, { useState, useEffect } from 'react';
import Modal from 'react-modal';
import Select from 'react-select';
import styles from './CreateCompetitionModal.module.scss';
import { useAuth } from '../../context/AuthContext';
import { CompetitionType } from '../../enums/competition-type.enum.ts';
import { CompetitionResult } from '../../enums/competition-result.enum.ts';
Modal.setAppElement('#root');

const CreateCompetitionModal = ({ isOpen, onClose, onCreate }) => {
  const {institutionId}=useAuth();
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    date: '',
    result: '',
    competitionType: '',
    studentId: '',
    teacherId: ''
  });

  

  const [teachers, setTeachers] = useState([]);
  const [students, setStudents] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const teachersResponse = await fetch(`http://localhost:3000/institutions/${institutionId}/teachers`);
      const studentsResponse = await fetch(`http://localhost:3000/institutions/${institutionId}/students`);

      const teachersData = await teachersResponse.json();
      const studentsData = await studentsResponse.json();

      setTeachers(teachersData.map(teacher => ({ value: teacher.id, label: `${teacher.firstName} ${teacher.lastName}` })));
      setStudents(studentsData.map(student => ({ value: student.id, label: `${student.firstName} ${student.lastName}` })));
    } catch (error) {
      console.error('Помилка при завантаженні даних:', error);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
    onCreate(formData);
    onClose();
  };

  const handleChange = (selectedOption, { name }) => {
    setFormData({ ...formData, [name]: selectedOption ? selectedOption.value : '' });
  };
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };
  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onClose}
      contentLabel="Створити конкурс"
      className={styles.modal}
      overlayClassName={styles.overlay}
    >
      <div className={styles.modalContent}>
        <span className={styles.closeButton} onClick={onClose}>&times;</span>
        <h2>Створити конкурс</h2>
        <form onSubmit={handleSubmit}>
          <label>
            Назва:
            <input type="text" name="title" value={formData.title} onChange={handleInputChange} required />
          </label>
          <label>
            Опис:
            <input type="text" name="description" value={formData.description} onChange={handleInputChange} required />
          </label>
          <label>
            Дата:
            <input type="date" name="date" value={formData.date} onChange={handleInputChange} required />
          </label>
          <label>
            Тип:
            <select name="competitionType" value={formData.competitionType} onChange={handleInputChange} required>
              {Object.values(CompetitionType).map(type => (
                <option key={type} value={type}>{type}</option>
              ))}
            </select>
          </label>
          <label>
            Результат:
            <select name="result" value={formData.result} onChange={handleInputChange} required>
              {Object.values(CompetitionResult).map(result => (
                <option key={result} value={result}>{result}</option>
              ))}
            </select>
          </label>
          <label>
            Учасник:
            <Select
              name="studentId"
              options={students}
              onChange={handleChange}
              isClearable
              isSearchable
              required
            />
          </label>
          <label>
            Викладач:
            <Select
              name="teacherId"
              options={teachers}
              onChange={handleChange}
              isClearable
              isSearchable
              required
            />
          </label>
          <button type="submit">Створити</button>
        </form>
      </div>
    </Modal>
  );
};

export default CreateCompetitionModal;
