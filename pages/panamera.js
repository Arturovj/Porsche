import React from "react";
import Layout from "../components/Layout";
import { motion } from "framer-motion";
import Image from "next/image";
import styles from "../styles/Char911.module.css";
import { Box } from "@mui/material";

const imageAnimate = {
  offscreen: { x: -100, opacity: 0 },
  onscreen: { x: 0, opacity: 1 },
  transition: {
    type: "spring",
    duration: 5,
  },
};

const textAnimate = {
  offscreen: { y: 100, opacity: 0 },
  onscreen: { y: 0, opacity: 1 },
  transition: {
    type: "spring",
    duration: 5,
  },
};

export default function porschePanamera() {
  return (
    <Layout>
    <Box mt={2}>
    <div className={styles.container911}>
      <motion.div
        initial={"offscreen"}
        whileInView={"onscreen"}
        viewport={{ once: false, amount: 0.5 }}
        transition={{ staggerChildren: 5 }}
        variants={imageAnimate}
      >
         <motion.p
          initial={"offscreen"}
          whileInView={"onscreen"}
          variants={textAnimate}
        >
          <div className={styles.title}>
            <h1>Panamera</h1>
          </div>
          <div className={styles.specschar}>
            <div className={styles.char911}>
              <h1>325hp</h1>
              <h6 className={styles.char911text}>Max Power</h6>
            </div>
            <div className={styles.char911}>
              <h1>5.3 s</h1>
              <h6 className={styles.char911text}>0-60 mph</h6>
            </div>

            <div className={styles.char911}>
              <h1>168mph</h1>
              <h6 className={styles.char911text}>Top Track Speed</h6>
            </div>
          </div>
        </motion.p>
        <Image
          src="/img/panamerapage1.jpeg"
          alt="Porsche 911"
          width={1280}
          height={720}
        />
         
      
      </motion.div>
      </div>
      <div className={styles.char}>
        <motion.p
          initial={"offscreen"}
          whileInView={"onscreen"}
          variants={textAnimate}
        >
          <div>
            <h1>Porsche Panamera</h1>
          </div>
          <h3>
            <p>
              Our engineers like to talk about the most perfect sports car in
              history.
              <br />
              Extremely sporty, comfortable and suitable for everyday wear.
              <br />
              The Panamera models continue down this path.
            </p>
          </h3>
        </motion.p>
        <motion.div
          initial={"offscreen"}
          whileInView={"onscreen"}
          viewport={{ once: false, amount: 0.5 }}
          transition={{ staggerChildren: 5 }}
          variants={imageAnimate}
        >
          <Image
            src="/img/panamerapage2.jpeg"
            alt="Porsche 911"
            width={720}
            height={480}
          />
        </motion.div>
      </div>
      <motion.p
        initial={"offscreen"}
        whileInView={"onscreen"}
        variants={textAnimate}
      >
        
      </motion.p>
    </Box>
  </Layout>
  )
}
