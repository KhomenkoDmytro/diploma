import React, { useState, useEffect, useMemo } from 'react';
import CreateSubjectAssignmentModal from '../../components/CreateSubjectAssignmentModal/CreateSubjectAssignmentModal';
import style from './SubjectAssignmentsPage.module.scss';
import StyledHeading from '../../components/Heading/StyledHeading';
import { useAuth } from '../../context/AuthContext';

const GlobalFilter = ({ globalFilter, setGlobalFilter }) => (
  <span>
    Пошук:{' '}
    <input
      value={globalFilter || ''}
      onChange={e => setGlobalFilter(e.target.value)}
      placeholder="Введіть ключові слова..."
      className={style.searchInput}
    />
  </span>
);

const SubjectAssignmentsPage = () => {
  const { institutionId } = useAuth();
  const [subjectAssignments, setSubjectAssignments] = useState([]);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);

  useEffect(() => {
    fetchSubjectAssignments();
  }, [institutionId]);

  const fetchSubjectAssignments = async () => {
    try {
      const response = await fetch(`http://localhost:3000/institutions/${institutionId}/subject-assignments`);
      const data = await response.json();
      console.log(data);
      setSubjectAssignments(data);
    } catch (error) {
      console.error('Помилка завантаження призначень предметів:', error);
    }
  };

  const handleAddSubjectAssignment = async (newAssignment) => {
    try {
      await fetch('http://localhost:3000/subject-assignments', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(newAssignment)
      });
      fetchSubjectAssignments();
    } catch (error) {
      console.error('Помилка створення призначення предмету:', error);
    }
  };

  const handleUpdateAssignment = (assignmentId) => {
    // Логіка для оновлення призначення
  };

  const handleDeleteAssignment = async (assignmentId) => {
    try {
      await fetch(`http://localhost:3000/subject-assignments/${assignmentId}`, {
        method: 'DELETE',
      });
      fetchSubjectAssignments();
    } catch (error) {
      console.error('Помилка видалення призначення предмету:', error);
    }
  };

  const data = useMemo(() => {
    return subjectAssignments.map(teacher => ({
      teacher: `${teacher.lastName} ${teacher.firstName} ${teacher.patronymic || ''}`,
      assignments: teacher.assignments.map(assignment => ({
        id: assignment.id,
        subject: assignment.subject.name,
        student: `${assignment.student.lastName} ${assignment.student.firstName} ${assignment.student.patronymic || ''}`,
        birthDate: new Date(assignment.student.birthDate).toLocaleDateString(),
        startDate: new Date(assignment.student.startDate).toLocaleDateString(),
        status: assignment.status === 'активний' ? 'навчається' : 'не навчається',
      })),
    }));
  }, [subjectAssignments]);

  return (
    <div className={style.wrapper}>
      <StyledHeading text="Розподіл учнів по класах "></StyledHeading>
      <div className={style.buttonGroup}>
        <button onClick={() => setIsCreateModalOpen(true)}>Додати</button>
      </div>
      <CreateSubjectAssignmentModal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
        onCreate={handleAddSubjectAssignment}
      />
      {data.map((teacherData, index) => (
        <div key={index} className={style.teacherSection}>
          <h2>{teacherData.teacher}</h2>
          <table className={style.table}>
            <thead>
              <tr>
                <th>#</th>
                <th>Предмет</th>
                <th>Учень</th>
                <th>Дата народження</th>
                <th>Дата зарахування</th>
                <th>Статус</th>
                <th>Дії</th>
              </tr>
            </thead>
            <tbody>
              {teacherData.assignments.map((assignment, idx) => (
                <tr key={assignment.id}>
                  <td>{idx + 1}</td>
                  <td>{assignment.subject}</td>
                  <td>{assignment.student}</td>
                  <td>{assignment.birthDate}</td>
                  <td>{assignment.startDate}</td>
                  <td>{assignment.status}</td>
                  <td>
                    <button className={style.updateButton} onClick={() => handleUpdateAssignment(assignment.id)}>Оновити</button>
                    <button className={style.deleteButton} onClick={() => handleDeleteAssignment(assignment.id)}>Видалити</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ))}
    </div>
  );
};

export default SubjectAssignmentsPage;
