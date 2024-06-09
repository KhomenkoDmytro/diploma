import React, { useState, useEffect } from 'react';
import styles from './ComplaintsPage.module.scss';
import { useAuth } from '../../context/AuthContext';
import ComplaintModal from '../../components/ComplaintModal/ComplaintModal';

const ComplaintsPage = () => {
  const [complaints, setComplaints] = useState([]);
  const [employees, setEmployees] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortedField, setSortedField] = useState(null);
  const [sortDirection, setSortDirection] = useState('asc');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentComplaint, setCurrentComplaint] = useState(null);
  const { institutionId } = useAuth();

  useEffect(() => {
    fetchComplaints();
    fetchEmployees();
  }, []);

  const fetchComplaints = async () => {
    try {
      const response = await fetch(`http://localhost:3000/institutions/${institutionId}/complaints`);
      const data = await response.json();
      setComplaints(data);
    } catch (error) {
      console.error('Помилка завантаження скарг:', error);
    }
  };

  const fetchEmployees = async () => {
    try {
      const response = await fetch(`http://localhost:3000/institutions/${institutionId}/employees`);
      const data = await response.json();
      setEmployees(data);
    } catch (error) {
      console.error('Помилка завантаження працівників:', error);
    }
  };

  const handleSort = (field) => {
    const direction = sortedField === field && sortDirection === 'asc' ? 'desc' : 'asc';
    setSortedField(field);
    setSortDirection(direction);

    const sortedData = [...complaints].sort((a, b) => {
      if (field === 'date') {
        const dateA = new Date(a[field]);
        const dateB = new Date(b[field]);
        return direction === 'asc' ? dateA - dateB : dateB - dateA;
      }

      if (field === 'employee') {
        const nameA = a.employee ? `${a.employee.firstName} ${a.employee.lastName}`.toLowerCase() : '';
        const nameB = b.employee ? `${b.employee.firstName} ${b.employee.lastName}`.toLowerCase() : '';
        if (nameA < nameB) return direction === 'asc' ? -1 : 1;
        if (nameA > nameB) return direction === 'asc' ? 1 : -1;
        return 0;
      }

      if (typeof a[field] === 'string' && typeof b[field] === 'string') {
        const fieldA = a[field].toLowerCase();
        const fieldB = b[field].toLowerCase();
        if (fieldA < fieldB) return direction === 'asc' ? -1 : 1;
        if (fieldA > fieldB) return direction === 'asc' ? 1 : -1;
        return 0;
      }

      if (a[field] < b[field]) return direction === 'asc' ? -1 : 1;
      if (a[field] > b[field]) return direction === 'asc' ? 1 : -1;
      return 0;
    });

    setComplaints(sortedData);
  };

  const handleOpenModal = (complaint) => {
    setCurrentComplaint(complaint);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setCurrentComplaint(null);
    setIsModalOpen(false);
  };

  const handleSaveComplaint = async (formData) => {
    try {
      const method = currentComplaint ? 'PUT' : 'POST';
      const url = currentComplaint
        ? `http://localhost:3000/complaints/${currentComplaint.id}`
        : 'http://localhost:3000/complaints';

      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        fetchComplaints();
        handleCloseModal();
      } else {
        console.error('Помилка збереження скарги');
      }
    } catch (error) {
      console.error('Помилка при відправленні запиту на збереження скарги:', error);
    }
  };

  const handleDeleteComplaint = async (id) => {
    try {
      const response = await fetch(`http://localhost:3000/complaints/${id}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        fetchComplaints();
      } else {
        console.error('Помилка видалення скарги');
      }
    } catch (error) {
      console.error('Помилка при відправленні запиту на видалення скарги:', error);
    }
  };

  const filteredComplaints = complaints.filter(complaint =>
    complaint.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    complaint.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
    complaint.status.toLowerCase().includes(searchTerm.toLowerCase()) ||
    complaint.level.toLowerCase().includes(searchTerm.toLowerCase()) ||
    (complaint.employee && (
      complaint.employee.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      complaint.employee.lastName.toLowerCase().includes(searchTerm.toLowerCase())
    )) ||
    complaint.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    complaint.lastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    complaint.date.includes(searchTerm)
  );

  return (
    <div className={styles.container}>
      <h1>Список скарг</h1>
      <input
        type="text"
        placeholder="Пошук..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className={styles.searchInput}
      />
      <button onClick={() => handleOpenModal(null)}>Додати скаргу</button>
      <table className={styles.complaintsTable}>
        <thead>
          <tr>
            <th>#</th>
            <th onClick={() => handleSort('title')}>Назва</th>
            <th onClick={() => handleSort('description')}>Опис</th>
            <th onClick={() => handleSort('date')}>Дата</th>
            <th onClick={() => handleSort('status')}>Статус</th>
            <th onClick={() => handleSort('url')}>URL</th>
            <th onClick={() => handleSort('firstName')}>Складач скарги</th>
            <th onClick={() => handleSort('level')}>Рівень</th>
            <th onClick={() => handleSort('employee')}>Працівник</th>
            <th>Дії</th>
          </tr>
        </thead>
        <tbody>
          {filteredComplaints.map((complaint, index) => (
            <tr key={complaint.id}>
              <td>{index + 1}</td>
              <td>{complaint.title}</td>
              <td>{complaint.description}</td>
              <td>{complaint.date}</td>
              <td>{complaint.status}</td>
              <td><a href={complaint.url} target="_blank" rel="noopener noreferrer">Документ</a></td>
              <td>{complaint.firstName} {complaint.lastName}</td>
              <td>{complaint.level}</td>
              <td>{complaint.employee ? `${complaint.employee.firstName} ${complaint.employee.lastName}` : 'N/A'}</td>
              <td>
                <button onClick={() => handleOpenModal(complaint)}>Оновити</button>
                <button onClick={() => handleDeleteComplaint(complaint.id)}>Видалити</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <ComplaintModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onSave={handleSaveComplaint}
        complaint={currentComplaint}
        employees={employees}
      />
    </div>
  );
};

export default ComplaintsPage;
