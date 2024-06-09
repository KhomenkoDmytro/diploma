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
      <nav className={style.nav}>
        <ul className={style.navList}>
          <li className={style.navLi}>
            <Link to="/" className={style.navLink}>Профіль</Link>
          </li>
          <li className={style.navLi}>
            <div className={style.dropdown}>
              <Link to="#" className={style.dropbtn}>Документи</Link>
              <div className={style.dropdownContent}>
                <Link to="/decrees" className={style.navLink}>Накази</Link>
                <Link to="/letters" className={style.navLink}>Вихідні листи</Link>
                <Link to="/certification-letters" className={style.navLink}>Атестаційні листи</Link>
              </div>
            </div>
          </li>
          <li className={style.navLi}>
            <div className={style.dropdown}>
              <Link to="#" className={style.dropbtn}>Штат</Link>
              <div className={style.dropdownContent}>
                <Link to="/employees" className={style.navLink}>Особові справи</Link>
                <Link to="/analytics" className={style.navLink}>Аналітика роботи викладачів</Link>
              </div>
            </div>
          </li>
          <li className={style.navLi}>
          <div className={style.dropdown}>
              <Link to="#" className={style.dropbtn}>Контингент</Link>
              <div className={style.dropdownContent}>
                <Link to="/students" className={style.navLink}>Особові справи</Link>
                <Link to="/subject-assignment" className={style.navLink}>Розподіл по класах</Link>
              </div>
              </div>
          </li>
          <li className={style.navLi}>
            <div className={style.dropdown}>
              <Link to="#" className={style.dropbtn}>Навчальний процес</Link>
              <div className={style.dropdownContent}>
                <Link to="/competitions" className={style.navLink}>Виступи на конкурсах</Link>
                <Link to="/concerts" className={style.navLink}>Виступи на концертах</Link>
                <Link to="/events" className={style.navLink}>Заходи</Link>
              </div>
            </div>
          </li>
          <li className={style.navLi}>
            <Link to="/complaints" className={style.navLink}>Скарги</Link>
          </li>
          {isAuth ? (
            <li className={style.navLi}>
              <Link to="#" onClick={handleLogout} className={style.navLink}>Вийти</Link>
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
