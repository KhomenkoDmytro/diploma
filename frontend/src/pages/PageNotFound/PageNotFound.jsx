import ErrorPage from "../../components/ErrorPage/ErrorPage";
import styles from "./PageNotFound.module.scss";
const PageNotFound=() =>{
  return (
    <ErrorPage message="Page Not Found" className={styles.notFoundPage} />
  );
}
export default PageNotFound;