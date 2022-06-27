import Image from "next/image";
import styles from "../styles/Footer.module.css";

const Footer = () => {
  return (
    <div className={styles.container}>
      <div className={styles.item}>
        <Image src="/img/footer.jpg" objectFit="cover" layout="fill" alt="" />
      </div>
      <div className={styles.item}>
        <div className={styles.card}>
          <h2 className={styles.motto}>
            SINCE 1931, STUTTGART
          </h2>
        </div>
        <div className={styles.card}>
          <h1 className={styles.title}>FIND OUR STORES</h1>
          <p className={styles.text}>
          Porsche Zentrum Stuttgart.
            <br /> Porscheplatz 9, 70435 Stuttgart, Alemania
            <br />  +49 711 91126220
          </p>
         
         
        </div>
        <div className={styles.card}>
          <h1 className={styles.title}>WORKING HOURS</h1>
          <p className={styles.text}>
            MONDAY UNTIL FRIDAY
            <br /> 9:00 – 22:00
          </p>
          <p className={styles.text}>
            SATURDAY - SUNDAY
            <br /> 12:00 – 24:00
          </p>
        </div>
      </div>
    </div>
  );
};

export default Footer;