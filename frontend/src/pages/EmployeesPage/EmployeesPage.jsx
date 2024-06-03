import React, { useState, useEffect } from 'react';
import EmployeeCard from '../../components/EmployeeCard/EmployeeCard';
import CreateEmployeeModal from '../../components/CreateEmployeeModal/CreateEmployeeModal';
import UpdateEmployeeModal from '../../components/UpdateEmployeeModal/UpdateEmployeeModal';
import style from './EmployeesPage.module.scss';

const EmployeesPage = () => {
  const [employees, setEmployees] = useState([]);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
  const [selectedEmployee, setSelectedEmployee] = useState(null);

  useEffect(() => {
    fetchEmployees();
  }, []);

  const fetchEmployees = async () => {
    try {
      const response = await fetch('http://localhost:3000/employees');
      const data = await response.json();
      setEmployees(data);
    } catch (error) {
      console.error('Error fetching employees:', error);
    }
  };

  const handleAddEmployee = async (newEmployee) => {
    try {
      await fetch('http://localhost:3000/employees', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(newEmployee)
      });
      fetchEmployees();
    } catch (error) {
      console.error('Error creating employee:', error);
    }
  };

  const handleUpdateEmployee = async (id, updatedEmployee) => {
    try {
      await fetch(`http://localhost:3000/employees/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(updatedEmployee)
      });
      fetchEmployees();
    } catch (error) {
      console.error('Error updating employee:', error);
    }
  };

  const handleDeleteEmployee = async (id) => {
    try {
      await fetch(`http://localhost:3000/employees/${id}`, {
        method: 'DELETE',
      });
      fetchEmployees();
    } catch (error) {
      console.error('Error deleting employee:', error);
    }
  };

  const openUpdateModal = (employee) => {
    setSelectedEmployee(employee);
    setIsUpdateModalOpen(true);
  };

  const handleViewEmployee = (id) => {
    window.location.href = `/employee/${id}`;
  };

  return (
    <div className={style.wrapper}>
      <h2>Employees</h2>
      <div className={style.buttonGroup}>
        <button onClick={() => setIsCreateModalOpen(true)}>Додати</button>
      </div>
      <CreateEmployeeModal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
        onCreate={handleAddEmployee}
      />
      <UpdateEmployeeModal
        isOpen={isUpdateModalOpen}
        onClose={() => setIsUpdateModalOpen(false)}
        employee={selectedEmployee}
        onUpdate={handleUpdateEmployee}
      />
      <div className={style.employeesContainer}>
        {employees.map(employee => (
          <div className={style.employeeCard} key={employee.id}>
            <EmployeeCard
              employee={employee}
              onUpdate={openUpdateModal}
              onDelete={handleDeleteEmployee}
              onView={handleViewEmployee}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default EmployeesPage;
