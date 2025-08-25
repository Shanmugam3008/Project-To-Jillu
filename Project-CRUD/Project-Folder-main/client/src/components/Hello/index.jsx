import styles from "./styles.module.css";


const Carreer = () => {
  return (
    <div className={styles.gallery_container}>
      <nav className={styles.navbar}>
        <h1>Project</h1>
        <a href={"/"}><button className={styles.white_btn}>Back</button></a>
      </nav>
      <div className={styles.gallery_content}>
        <div className={styles.image_item}>Hey You Focus On Carreer</div>

      </div>
    </div>
  );
};

export default Carreer;
