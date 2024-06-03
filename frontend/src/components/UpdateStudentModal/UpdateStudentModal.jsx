import React, { useState, useEffect } from 'react';
import Modal from 'react-modal';
import style from './UpdateStudentModal.module.scss';

Modal.setAppElement('#root');

const UpdateStudentModal = ({ isOpen, onClose, student, onUpdate }) => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    patronymic: '',
    email: '',
    phoneNumber: '',
    identificationNumber: '',
    startDate: '',
    endDate: '',
    gender: '',
    residenceAddress: '',
    birthDate: '',
    actualAddress: '',
  });

  useEffect(() => {
    if (student) {
      setFormData({
        firstName: student.firstName || '',
        lastName: student.lastName || '',
        patronymic: student.patronymic || '',
        email: student.email || '',
        phoneNumber: student.phoneNumber || '',
        identificationNumber: student.identificationNumber || '',
        startDate: student.startDate ? new Date(student.startDate).toISOString().split('T')[0] : '',
        endDate: student.endDate ? new Date(student.endDate).toISOString().split('T')[0] : '',
        gender: student.gender || '',
        residenceAddress: student.residenceAddress || '',
        birthDate: student.birthDate ? new Date(student.birthDate).toISOString().split('T')[0] : '',
        actualAddress: student.actualAddress || '',
      });
    }
  }, [student]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onUpdate(student.id, formData);
    onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onClose}
      contentLabel="Update Student"
      className={style.modal}
      overlayClassName={style.overlay}
    >
      <h2>Update Student</h2>
      <form onSubmit={handleSubmit} className={style.form}>
        <label>
          First Name:
          <input type="text" name="firstName" value={formData.firstName} onChange={handleChange} required />
        </label>
        <label>
          Last Name:
          <input type="text" name="lastName" value={formData.lastName} onChange={handleChange} required />
        </label>
        <label>
          Patronymic:
          <input type="text" name="patronymic" value={formData.patronymic} onChange={handleChange} />
        </label>
        <label>
          Email:
          <input type="email" name="email" value={formData.email} onChange={handleChange} />
        </label>
        <label>
          Phone Number:
          <input type="text" name="phoneNumber" value={formData.phoneNumber} onChange={handleChange} required />
        </label>
        <label>
          Identification Number:
          <input type="text" name="identificationNumber" value={formData.identificationNumber} onChange={handleChange} required />
        </label>
        <label>
          Start Date:
          <input type="date" name="startDate" value={formData.startDate} onChange={handleChange} required />
        </label>
        <label>
          End Date:
          <input type="date" name="endDate" value={formData.endDate} onChange={handleChange} />
        </label>
        <label>
          Gender:
          <select name="gender" value={formData.gender} onChange={handleChange}>
            <option value="">Select Gender</option>
            <option value="чоловіча">Чоловік</option>
            <option value="жіноча">Жінка</option>
          </select>
        </label>
        <label>
          Residence Address:
          <input type="text" name="residenceAddress" value={formData.residenceAddress} onChange={handleChange} />
        </label>
        <label>
          Birth Date:
          <input type="date" name="birthDate" value={formData.birthDate} onChange={handleChange} required />
        </label>
        <label>
          Actual Address:
          <input type="text" name="actualAddress" value={formData.actualAddress} onChange={handleChange} />
        </label>
        <div className={style.buttonGroup}>
          <button type="submit">Update</button>
          <button type="button" onClick={onClose}>Cancel</button>
        </div>
      </form>
    </Modal>
  );
};

export default UpdateStudentModal;
