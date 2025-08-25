import styles from "./styles.module.css";

const Main = () => {
  const handleLogout = () => {
    localStorage.removeItem("token");
    window.location.reload();
  };

  return (
    <div className={styles.main_container}>
      <nav className={styles.navbar}>
        <h1>Project</h1>
        <div>
          
          <a href={"/Gallery"}><button className={styles.white_btn}>Hit Me Again</button></a>
          
          <button className={styles.white_btn} onClick={handleLogout}>
          Logout
          </button>
        </div>
      </nav>
    </div>
  );
};

export default Main;
