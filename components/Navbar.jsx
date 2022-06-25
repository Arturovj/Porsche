import styles from "../styles/Navbar.module.css";
import Image from "next/image";
import NextLink from "next/link";
import { Store } from "../utils/Store";
import Link from "next/link";
import { Badge, Typography } from "@mui/material";
import { useContext } from "react";

const Navbar = () => {
  const { state, dispatch } = useContext(Store);
  const { cart, userInfo } = state;
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
            <Link>
            <a>
              <Typography component="span">
                {cart.cartItems.length > 0 ? (
                  <Badge color="warning" badgeContent={cart.cartItems.length}>
                  <span> Cart</span> 
                  </Badge>
                ) : (
                  "Cart"
                )}
              </Typography>
              </a>
            </Link>
          </NextLink>
          {userInfo? (
             <NextLink href="/profile" passHref>
             <Link>
             <a>
               <div className={styles.counter}>{userInfo.name}</div>
               </a>
             </Link>
           </NextLink>

          ) : ( <NextLink href="/login" passHref>
             <Link>
             <a>
               <div className={styles.counter}><span>Login</span></div>
               </a>
             </Link>
           </NextLink>)
            }
         
        </div>
      </div>
    </div>
  );
};

export default Navbar;
