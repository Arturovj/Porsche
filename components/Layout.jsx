import { AppBar, Container, Toolbar, Typography } from "@material-ui/core";
import Head from "next/head";
import React from "react";
import useStyles from "../utils/styles";
import Image from "next/image";
import logo from "../utils/images/logo.png";
import letters from "../utils/images/letters1.png";
import NextLink from "next/link";
import { Box } from "@mui/material";

export default function Layout({ children }) {
  const classes = useStyles();

  return (
    <div>
      <Head>
        <title>PORSCHE</title>
      </Head>
      <AppBar position="static" className={classes.navbar}>
        <Toolbar>
          <NextLink href="/" passHref>
            <a>
              <Image src={logo} width={40} height={50} alt="Porsche Logo" />
            </a>
          </NextLink>
          <NextLink href="/" passHref>
            <a>
              <div className="letter">
                <Image
                  src={letters}
                  width={250}
                  height={25}
                  alt="Porsche Logo"
                />
              </div>
            </a>
          </NextLink>
          <NextLink href="/cars" passHref>
            <a>
              <Typography className={classes.title}>Cars</Typography>
            </a>
          </NextLink>
        </Toolbar>
      </AppBar>
      <Container pt={14}>{children}</Container>

      <Box>
      </Box>
      {/* <footer className={classes.footer}>
            <Typography>All rights reserved. Next Porsche</Typography>
        </footer> */}
    </div>
  );
}
