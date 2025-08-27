import styles from "./styles.module.css";

const Main = () => {
  const handleLogout = () => {
    localStorage.removeItem("token");
    window.location.reload();
  };

  return (
    <div className={styles.main_container}>
      <nav className={styles.navbar}>
        <h1>JILLU</h1>
        <div>
          <button className={styles.white_btn}>
          <a href={"/Gallery"}>Hello</a>
          </button>
          <button className={styles.white_btn} onClick={handleLogout}>
          Logout
          </button>
        </div>
      </nav>
      <div className={styles.center}>
        <div className={styles.back}></div>
        <div className={styles.heart_container}>
          <div className={styles.heart}></div>
          <button className={styles.gallery_btn}>
            <a href={"/Hello"}>HIT ME</a>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Main;
