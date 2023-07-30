import Image from "next/image";
import styles from "../styles/Footer.module.scss";

const Footer = () => {
  return (
    <>
      <div className={styles.container}>
        <div className={styles.section}>
          <h3>Menu</h3>
          <p>Home</p>
          <p>Why Choose Us</p>
          <p>Speial Menu</p>
          <p>All products</p>
        </div>
        <div className={styles.section}>
          <h3>Help</h3>
          <p>Privacy</p>
          <p>Terms & Condition</p>
          <p>Policy</p>
        </div>
        <div className={styles.section}>
          <h3>Contact</h3>
          <p>+2348098095334</p>
          <p>info@cimfodd.com</p>
          <p>1234, everyly road, SFO</p>
          <p>Contact us</p>
        </div>
        <div className={`${styles.section} ${styles.subscribeArea}`}>
          <h3>Subscribe to Our Newsletter</h3>
          <div className={styles.inputArea}>
            <input placeholder="Enter your email" type="text" />
            <button>Subscribe</button>
          </div>
        </div>
      </div>
      <p className={styles.footerMsg}>&copy; Copyright 2023</p>
    </>
  );
};

export default Footer;
