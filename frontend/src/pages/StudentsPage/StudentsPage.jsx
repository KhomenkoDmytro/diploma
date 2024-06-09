import React, { useState, useEffect } from 'react';
import StudentCard from '../../components/StudentCard/StudentCard';
import CreateStudentModal from '../../components/CreateStudentModal/CreateStudentModal';
import UpdateStudentModal from '../../components/UpdateStudentModal/UpdateStudentModal';
import style from './StudentsPage.module.scss';
import { useAuth } from '../../context/AuthContext';
import StyledHeading from '../../components/Heading/StyledHeading';

const StudentsPage = () => {
  const { institutionId } = useAuth();
  const [students, setStudents] = useState([]);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState(null);

  useEffect(() => {
    if (institutionId) {
      fetchStudents();
    }
  }, [institutionId]);

  const fetchStudents = async () => {
    try {
      const response = await fetch(`http://localhost:3000/students?institutionId=${institutionId}`);
      const data = await response.json();
      if (Array.isArray(data)) {
        setStudents(data);
      } else {
        setStudents([]);
        console.error('Error: expected an array of students');
      }
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
        body: JSON.stringify({ ...newStudent, institutionId })
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
        body: JSON.stringify({ ...updatedStudent, institutionId })
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
      <StyledHeading text="Учні"></StyledHeading>
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
