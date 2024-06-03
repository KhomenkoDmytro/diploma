import React, { useState, useEffect } from 'react';
import Modal from 'react-modal';
import style from './UpdateEmployeeModal.module.scss';

Modal.setAppElement('#root');

const UpdateEmployeeModal = ({ isOpen, onClose, employee, onUpdate }) => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    patronymic: '',
    email: '',
    phoneNumber: '',
    employmentType: 'повний робочий день',
    identificationNumber: '',
    workExperienceId: '',
    startDate: '',
    endDate: '',
    gender: '',
    position: 'викладач',
    residenceAddress: '',
    birthDate: '',
    actualAddress: '',
  });

  useEffect(() => {
    if (employee) {
      setFormData({
        firstName: employee.firstName || '',
        lastName: employee.lastName || '',
        patronymic: employee.patronymic || '',
        email: employee.email || '',
        phoneNumber: employee.phoneNumber || '',
        employmentType: employee.employmentType || 'повний робочий день',
        identificationNumber: employee.identificationNumber || '',
        workExperienceId: employee.workExperienceId || '',
        startDate: employee.startDate ? new Date(employee.startDate).toISOString().split('T')[0] : '',
        endDate: employee.endDate ? new Date(employee.endDate).toISOString().split('T')[0] : '',
        gender: employee.gender || '',
        position: employee.position,
        residenceAddress: employee.residenceAddress || '',
        birthDate: employee.birthDate ? new Date(employee.birthDate).toISOString().split('T')[0] : '',
        actualAddress: employee.actualAddress || '',
      });
    }
  }, [employee]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onUpdate(employee.id, formData);
    onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onClose}
      contentLabel="Update Employee"
      className={style.modal}
      overlayClassName={style.overlay}
    >
      <h2>Оновлення даних працівника</h2>
      <form onSubmit={handleSubmit} className={style.form}>
        <label>
          Ім'я:
          <input type="text" name="firstName" value={formData.firstName} onChange={handleChange} required />
        </label>
        <label>
          Прізвище:
          <input type="text" name="lastName" value={formData.lastName} onChange={handleChange} required />
        </label>
        <label>
          По батькові:
          <input type="text" name="patronymic" value={formData.patronymic} onChange={handleChange} />
        </label>
        <label>
          Email:
          <input type="email" name="email" value={formData.email} onChange={handleChange} />
        </label>
        <label>
          Номер телефону:
          <input type="text" name="phoneNumber" value={formData.phoneNumber} onChange={handleChange} required />
        </label>
        <label>
          Тип працевлаштування:
          <select name="employmentType" value={formData.employmentType} onChange={handleChange} required>
            <option value="повний робочий день">Повний робочий день</option>
            <option value="неповний робочий день">Неповний робочий день</option>
            <option value="контракт">Контракт</option>
          </select> 
        </label>
        <label>
        Ідентифікаційний номер:
          <input type="text" name="identificationNumber" value={formData.identificationNumber} onChange={handleChange} required />
        </label>
        <label>
          Дата прийняття на роботу:
          <input type="date" name="startDate" value={formData.startDate} onChange={handleChange} required />
        </label>
        <label>
          Дата звільнення:
          <input type="date" name="endDate" value={formData.endDate} onChange={handleChange} />
        </label>
        <label>
          Стать:
          <select name="gender" value={formData.gender} onChange={handleChange}>
            <option value="">Виберіть стать</option>
            <option value="чоловіча">Чоловік</option>
            <option value="жіноча">Жінка</option>
          </select>
        </label>
        <label>
          Посада:
          <select name="position" value={formData.position} onChange={handleChange} required>
          <option value="викладач">Викладач</option>
          <option value="прибиральниця">Прибиральниця</option>
          <option value="адміністратор">Адміністратор</option>
          <option value="директор">Директор</option>
          <option value="головний бухгалтер">Головний бухгалтер</option>
          <option value="помічник бухгалтера">Помічник бухгалтера</option>
          <option value="завуч">Завуч</option>
          <option value="охоронець">Охоронець</option>
          <option value="настроювач інструментів">Настроювач інструментів</option>
          <option value="завгосп">Завгосп</option>
          </select>
        </label>
        <label>
          Місце прописки:
          <input type="text" name="residenceAddress" value={formData.residenceAddress} onChange={handleChange} />
        </label>
        <label>
          Дата народження:
          <input type="date" name="birthDate" value={formData.birthDate} onChange={handleChange} required />
        </label>
        <label>
          Місце фактичного проживання:
          <input type="text" name="actualAddress" value={formData.actualAddress} onChange={handleChange} />
        </label>
        <div className={style.buttonGroup}>
          <button type="submit">Оновити</button>
          <button type="button" onClick={onClose}>Відмінити</button>
        </div>
      </form>
    </Modal>
  );
};

export default UpdateEmployeeModal;
