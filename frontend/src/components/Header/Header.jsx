import React from 'react';
import { Link } from 'react-router-dom';
import style from './Header.module.scss';
import { useAuth } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const Header = () => {
  const { isAuth, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <header className={style.header}>
      <nav>
        <ul className={style.navList}>
          <li className={style.navLi}>
            <Link to="/" className={style.navLink}>Головна</Link>
          </li>
          <li className={style.navLi}>
            <Link to="/decrees" className={style.navLink}>Накази</Link>
          </li>
          <li className={style.navLi}>
            <Link to="/employees" className={style.navLink}>Працівники</Link>
          </li>
          <li className={style.navLi}>
            <Link to="/students" className={style.navLink}>Учні</Link>
          </li>
          <li className={style.navLi}>
            <Link to="/activities" className={style.navLink}>Заходи</Link>
          </li>
          <li className={style.navLi}>
            <Link to="/subject-assignment" className={style.navLink}>Розподіл предметів</Link>
          </li>
          <li className={style.navLi}>
            <Link to="/analytics" className={style.navLink}>Аналітика</Link>
          </li>

          {isAuth ? (
            <li className={style.navLi}>
              <button onClick={handleLogout} className={style.navLink}>Вийти</button>
            </li>
          ) : (
            <>
              <li className={style.navLi}>
                <Link to="/login" className={style.navLink}>Вхід</Link>
              </li>
              <li className={style.navLi}>
                <Link to="/registration" className={style.navLink}>Реєстрація</Link>
              </li>
            </>
          )}
        </ul>
      </nav>
    </header>
  );
};

export default Header;
