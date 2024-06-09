// CreateCompetitionModal.js
import React, { useState } from 'react';
import Modal from 'react-modal';
import style from './CreateCompetitionModal.module.scss';

Modal.setAppElement('#root');

const CreateCompetitionModal = ({ isOpen, onClose, onCreate }) => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    date: '',
    level: 'міський',
    result: '',
    competitionType: '',
  });

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
      contentLabel="Create Competition"
      className={style.modal}
      overlayClassName={style.overlay}
    >
      <h2>Створення нового конкурсу</h2>
      <form onSubmit={handleSubmit} className={style.form}>
        {/* Форма для введення даних конкурсу */}
      </form>
    </Modal>
  );
};

export default CreateCompetitionModal;
