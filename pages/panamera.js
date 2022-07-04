import React, { useState } from "react";
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





export default function PorschePanamera() {
    const panameraData = [
        {
            id: 1,
            name: 'Panamera',
            colors: ['#efefef', '#000000', '#3c3c32', '#502b3a','#00194b', '#d34624'],
            checkImg: {
              '#efefef': true,
              '#000000': false,
              '#3c3c32': false,
              '#502b3a': false,
                '#00194b': false,
                '#d34624': false,
            },
        
            linkImg: {
              '#efefef':
                '/img/panamerawhite.jpeg',
        
              '#000000':
                '/img/panamerablack.jpeg',
        
              '#3c3c32': '/img/panameragreen.jpeg',

              '#502b3a': '/img/panamerabrown.jpeg',
              '#00194b': '/img/panamerablue.jpeg',
                '#d34624': '/img/panameraorange.jpeg',
            },
          },
       ]

  const [ cars, setCars ] = useState(panameraData);


  const handleChooseColor = (id, color) => {
    setCars((prev) => {
        return prev.map(car => {
            if(car.id === id) {
                let newCheckImg = {};
                Object.keys(car.checkImg).map((item) => {
                    car.checkImg[item] = false;
                    newCheckImg = {...car.checkImg, [color]: true};
                    return null;
                })
                return {...car, checkImg: newCheckImg};
            } else {
                return car;
            }
    })
    })
  }


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
          className={styles.image}
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
          className={styles.image}
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

      <motion.div
        initial={"offscreen"}
        whileInView={"onscreen"}
        viewport={{ once: false, amount: 0.5 }}
        transition={{ staggerChildren: 5 }}
        variants={imageAnimate}
      >
        <div >
        {cars.map((car) => (
            <div key={car.id} className={styles.colorsContainer}>
              {/* Render ImG  */}
              {/* If Checkimg property true => render img with that property
               */}
              {Object.keys(car.checkImg).map((item) => {
                if (car.checkImg[item]) {
                  return (
                    <Image
                      key={item}
                      src={car.linkImg[item]}
                      alt={car.name}
                      className={styles.image}
                        width={720}
                        height={480}
                    />
                   
                  );
                } else {
                  return null;
                }
              })}
              <Box ml={5}>
             <h4><p>{car.name} Exterior Colors</p></h4> 
              <div className={styles.colors}>
                {car.colors.map((color) => (
                  <p
                    key={color}
                    className={` ${car.checkImg[color] && 'active'}   `}
                    style={{
                      backgroundColor: color,
                      width: 40,
                      height: 40,
                      borderRadius: '50%',
                      marginRight: 10,
                      cursor: 'pointer',
                    }}
                    onClick={() => handleChooseColor(car.id, color)}
                  ></p>
                ))}
              </div>
              </Box>
              
            </div>
          ))}
          
        </div>
        </motion.div>
    </Box>
  </Layout>
  )
}
