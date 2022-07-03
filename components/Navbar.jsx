import styles from "../styles/Navbar.module.css";
import Image from "next/image";
import NextLink from "next/link";
import { Store } from "../utils/Store";
import Link from "next/link";
import { Badge, Typography, Button, Menu, MenuItem, Box } from "@mui/material";
import { useContext, useState } from "react";
import { useRouter } from "next/router";
import jsCookie from "js-cookie";

const Navbar = () => {
  const router = useRouter();
  const { state, dispatch } = useContext(Store);
  const { cart, userInfo } = state;

  const [anchorEl, setAnchorEl] = useState(null);

  const loginMenuCloseHandler = (e, redirect) => {
    setAnchorEl(null);
    if (redirect) {
      router.push(redirect);
    }
  };
  const loginClickHandler = (e) => {
    setAnchorEl(e.currentTarget);
  };
  const logoutClickHandler = () => {
    setAnchorEl(null);
    dispatch({ type: "USER_LOGOUT" });
    jsCookie.remove("userInfo");
    jsCookie.remove("cartItems");
    jsCookie.remove("shippingAddress");
    jsCookie.remove("paymentMethod");
    router.push("/");
  };

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
              <li className={styles.listItem}>Shop</li>
            </a>
          </NextLink>
          {/* <Image src="/img/logo.png" alt="" width="160px" height="69px" /> */}
          <li className={styles.listItem}>Cars
          <div className={styles.megaBox}>
              <div className={styles.content}>
                <div className={styles.row}>
                        <Image src="/img/real911.jpg" alt="" width={250} height={200} />
                </div>
                <div className={styles.row}>
                        <Image src="/img/718real.jpg" alt="" width={250} height={200} />
                </div>
                <div className={styles.row}>
                        <Image src="/img/panamerareal.jpg" alt="" width={250} height={200} />
                </div>
                <div className={styles.row}>
                        <Image src="/img/macanreal.jpg" alt="" width={250} height={200} />
                </div>
              </div>
          </div>
          </li>



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
          {userInfo ? (
            <>
              <Box ml={5}>
                <Button
                  aria-controls="simple-menu"
                  aria-haspopup="true"
                  onClick={loginClickHandler}
                  variant="contained"
                  style={{
                    borderRadius: 5,
                    backgroundColor: "#C29049",
                    fontSize: "px",
                  }}
                >
                  {userInfo.name}
                </Button>
              </Box>
              <Menu
                id="simple-menu"
                anchorEl={anchorEl}
                keepMounted
                open={Boolean(anchorEl)}
                onClose={(_, reason) => {
                  if (reason !== "backdropClick") {
                    loginMenuCloseHandler();
                  }
                }}
              >
                <MenuItem onClick={(e) => loginMenuCloseHandler(e, "/profile")}>
                  Profile
                </MenuItem>
                <MenuItem
                  onClick={(e) => loginMenuCloseHandler(e, "/order-history")}
                >
                  Order History
                </MenuItem>
                <MenuItem onClick={logoutClickHandler}>Logout</MenuItem>
              </Menu>
            </>
          ) : (
            <NextLink href="/login" passHref>
              <Link>
                <a>
                  <div className={styles.counter}>
                    <span>Login</span>
                  </div>
                </a>
              </Link>
            </NextLink>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
