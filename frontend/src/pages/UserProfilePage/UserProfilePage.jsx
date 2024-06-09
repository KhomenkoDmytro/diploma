import React, { useEffect, useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import style from './UserProfilePage.module.scss';
import StyledHeading from '../../components/Heading/StyledHeading';

const UserProfilePage = () => {
  const { user, institutionId } = useAuth();
  const [institution, setInstitution] = useState(null);

  useEffect(() => {
    if (institutionId && user) {
      fetchInstitution(institutionId);
    }
  }, [institutionId, user]);
  

   const fetchInstitution = async (id) => {
    try {
      const response = await fetch(`http://localhost:3000/institutions/${id}`);
      const data = await response.json();
      setInstitution(data);
    } catch (error) {
      console.error('Error fetching institution:', error);
    }
  }; 



  return (
    <div className={style.wrapper}>
      <StyledHeading text="Профіль" />
      <br />
      <div className={style.userInfo}>
        <h3>Інформація про користувача</h3>
        {user ? (
          <>
            <p><strong>Ім'я:</strong> {user.firstName}</p>
            <p><strong>Прізвище:</strong> {user.lastName}</p>
            <p><strong>Email:</strong> {user.email}</p>
          </>
        ) : (
          <p>Loading...</p>
        )}
      </div>

      <div className={style.institutionInfo}>
        <h3>Інформація про школу</h3>
        {institution ? (
          <>
            <p><strong>Назва школи:</strong> {institution.name}</p>
            <p><strong>Ключ доступу:</strong> {institution.accessKey}</p>
            <p><strong>Адреса:</strong> {institution.address}</p>
            {/* <button onClick={}>Відв'язати школу</button> */}
          </>
        ) : (
          <p>Ви не підв'язані до жодної школи</p>
        )}
      </div>
    </div>
  );
};

export default UserProfilePage;
