import {  Container } from "@material-ui/core";
import Head from "next/head";
import React from "react";


import { Box } from "@mui/material";
import Navbar from "../components/Navbar";
import Footer from "./Footer";


export default function Layout({ children }) {


  return (
    <div>
      <Head>
        <title>PORSCHE by Arturo Vivar</title>
      </Head>
    
        <Navbar/>
        {/* <Toolbar>
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
          <NextLink href="/about" passHref>
            <a>
              <Typography className={classes.title}>About</Typography>
            </a>
          </NextLink>
          <NextLink href="/contact" passHref>
            <a>
              <Typography className={classes.title}>Contact</Typography>
            </a>
          </NextLink>
         
          <NextLink href="/cart" passHref>
            <a>
              <Typography className={classes.title}>Cart</Typography>
            </a>
          </NextLink>
        </Toolbar> */}
     
      <Container pt={14}>{children}</Container>

      <Box mt={20}>
      <div>
        <Footer/>
      </div>

      </Box>
     
      {/* <footer className={classes.footer}>
            <Typography>All rights reserved. Next Porsche</Typography>
        </footer> */}
    </div>
  );
}
