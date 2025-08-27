import styles from "./styles.module.css";


const Carreer = () => {
  return (
    <div className={styles.gallery_container}>
      <nav className={styles.navbar}>
        <h1>JILLU</h1>
        <a href={"/"}><button className={styles.white_btn}>Back</button></a>
      </nav>
      <div className={styles.gallery_content}>
        <div className={styles.image_item}>Focus on your path, and trust that time will softly guide us where we’re meant to be.</div>

      </div>
    </div>
  );
};

export default Carreer;
