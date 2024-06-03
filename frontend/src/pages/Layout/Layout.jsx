// import {useEffect} from 'react';
import {Outlet} from "react-router";
import styles from "./Layout.module.scss";
import Header from "../../components/Header/Header.jsx";

export default function Layout() {
 

  return (
    <div>
      <Header/>
      <main className={styles.main}>
        <Outlet/>
      </main>
    </div>
  );
}