import React, { useState, useEffect } from 'react';
import Modal from 'react-modal';
import Select from 'react-select';
import style from './CreateSubjectAssignmentModal.module.scss';
import { useAuth } from '../../context/AuthContext';

Modal.setAppElement('#root');

const CreateSubjectAssignmentModal = ({ isOpen, onClose, onCreate }) => {
  const {institutionId}=useAuth();
  const [subjects, setSubjects] = useState([]);
  const [students, setStudents] = useState([]);
  const [teachers, setTeachers] = useState([]);
  const [formData, setFormData] = useState({
    subjectId: '',
    studentId: '',
    teacherId: '',
    status: 'активний',
  });

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const [subjectsResponse, studentsResponse, teachersResponse] = await Promise.all([
        fetch( `http://localhost:3000/subjects`),
        fetch(`http://localhost:3000/institutions/${institutionId}/students`),
        fetch(`http://localhost:3000/institutions/${institutionId}/teachers`),
      ]);

      const [subjectsData, studentsData, teachersData] = await Promise.all([
        subjectsResponse.json(),
        studentsResponse.json(),
        teachersResponse.json(),
      ]);

      setSubjects(subjectsData.map(subject => ({ value: subject.id, label: subject.name })));
      setStudents(studentsData.map(student => ({ value: student.id, label: `${student.firstName} ${student.lastName}` })));
      setTeachers(teachersData.map(teacher => ({ value: teacher.id, label: `${teacher.firstName} ${teacher.lastName}` })));
    } catch (error) {
      console.error('Помилка при завантаженні даних:', error);
    }
  };

  const handleChange = (selectedOption, { name }) => {
    setFormData({ ...formData, [name]: selectedOption ? selectedOption.value : '' });
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
      contentLabel="Створити призначення предмету"
      className={style.modal}
      overlayClassName={style.overlay}
    >
      <h2>Створити призначення предмету</h2>
      <form onSubmit={handleSubmit} className={style.form}>
        <label>
          Предмет:
          <Select
            name="subjectId"
            options={subjects}
            onChange={handleChange}
            isClearable
            isSearchable
            required
          />
        </label>
        <label>
          Учень:
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
          Вчитель:
          <Select
            name="teacherId"
            options={teachers}
            onChange={handleChange}
            isClearable
            isSearchable
            required
          />
        </label>
        <label>
          Статус:
          <select name="status" value={formData.status} onChange={e => setFormData({ ...formData, status: e.target.value })} required>
            <option value="активний">Активний</option>
            <option value="неактивний">Неактивний</option>
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

export default CreateSubjectAssignmentModal;
