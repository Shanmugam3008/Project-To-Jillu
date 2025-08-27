import styles from "./styles.module.css";


const Carreer = () => {
  return (
    <div className={styles.gallery_container}>
      <nav className={styles.navbar}>
        <h1>JILLU</h1>
        <button className={styles.white_btn}><a href={"/"}>Back</a></button>
      </nav>
      <div className={styles.gallery_content}>
        <div className={styles.image_item}>Hey You Focus On Carreer</div>

      </div>
    </div>
  );
};

export default Carreer;
