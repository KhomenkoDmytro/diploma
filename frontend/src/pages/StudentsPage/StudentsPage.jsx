import React, { useState, useEffect } from 'react';
import StudentCard from '../../components/StudentCard/StudentCard';
import CreateStudentModal from '../../components/CreateStudentModal/CreateStudentModal';
import UpdateStudentModal from '../../components/UpdateStudentModal/UpdateStudentModal';
import style from './StudentsPage.module.scss';

const StudentsPage = () => {
  const [students, setStudents] = useState([]);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState(null);

  useEffect(() => {
    fetchStudents();
  }, []);

  const fetchStudents = async () => {
    try {
      const response = await fetch('http://localhost:3000/students');
      const data = await response.json();
      setStudents(data);
    } catch (error) {
      console.error('Error fetching students:', error);
    }
  };

  const handleAddStudent = async (newStudent) => {
    try {
      await fetch('http://localhost:3000/students', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(newStudent)
      });
      fetchStudents();
    } catch (error) {
      console.error('Error creating student:', error);
    }
  };

  const handleUpdateStudent = async (id, updatedStudent) => {
    try {
      await fetch(`http://localhost:3000/students/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(updatedStudent)
      });
      fetchStudents();
    } catch (error) {
      console.error('Error updating student:', error);
    }
  };

  const handleDeleteStudent = async (id) => {
    try {
      await fetch(`http://localhost:3000/students/${id}`, {
        method: 'DELETE',
      });
      fetchStudents();
    } catch (error) {
      console.error('Error deleting student:', error);
    }
  };

  const openUpdateModal = (student) => {
    setSelectedStudent(student);
    setIsUpdateModalOpen(true);
  };

  const handleViewStudent = (id) => {
    window.location.href = `/student/${id}`;
  };

  return (
    <div className={style.wrapper}>
      <h2>Students</h2>
      <div className={style.buttonGroup}>
        <button onClick={() => setIsCreateModalOpen(true)}>Додати</button>
      </div>
      <CreateStudentModal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
        onCreate={handleAddStudent}
      />
      <UpdateStudentModal
        isOpen={isUpdateModalOpen}
        onClose={() => setIsUpdateModalOpen(false)}
        student={selectedStudent}
        onUpdate={handleUpdateStudent}
      />
      <div className={style.studentsContainer}>
        {students.map(student => (
          <div className={style.studentCard} key={student.id}>
            <StudentCard
              student={student}
              onUpdate={openUpdateModal}
              onDelete={handleDeleteStudent}
              onView={handleViewStudent}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default StudentsPage;
