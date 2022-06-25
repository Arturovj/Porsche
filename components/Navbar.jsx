import styles from "../styles/Navbar.module.css";
import Image from "next/image";
import NextLink from "next/link";

const Navbar = () => {
  return (
    <div className={styles.container}>
      <div className={styles.item}>
        <div className={styles.callButton}>
        <NextLink href="/" passHref>
            <a>
          <Image src="/img/logo.png" alt="" width={45} height={55} />
            </a>
            </NextLink>
        </div>
        
        <div className={styles.letters}>
        <NextLink href="/" passHref>
            <a>
        <Image src="/img/letters1.png" alt="" width={250} height={25} />
        </a>
        </NextLink>
        </div>
      </div>
      <div className={styles.item}>
        <ul className={styles.list}>
        
          <NextLink href="/cars" passHref>
            <a>
          <li className={styles.listItem}>Cars</li>
            </a>
            </NextLink>
          {/* <Image src="/img/logo.png" alt="" width="160px" height="69px" /> */}
          <li className={styles.listItem}>Events</li>
          <li className={styles.listItem}>Blog</li>
          <li className={styles.listItem}>Contact</li>
        </ul>
      </div>
      <div className={styles.item}>
        <div className={styles.cart}>
          {/* <Image src="/img/cart.png" alt="" width="30px" height="30px" /> */}
         
          <NextLink href="/cart" passHref>
            <a>
          <div className={styles.counter}>Cart</div>
            </a>
            </NextLink>
          <div className={styles.counter}>Profile</div>
        </div>
      </div>
    </div>
  );
};


export default Navbar;
