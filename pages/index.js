// import Head from "next/head";
// import Image from "next/image";
import { Box, Button, Link } from "@mui/material";
import { useEffect, useState } from "react";
import PorscheCanvas from "../canvas/canvas";
import BannerExample from "../components/Carousel";
import NextLink from "next/link";

import React from "react";
import Slider from "react-slick";

import Layout from "../components/Layout";
import Image from "next/dist/client/image";
import styles from "../styles/Carousel.module.css";

import client from "../utils/client";

// import { dataPorsche } from "../utils/data";

export default function Home() {
  const [state, setState] = useState({
    products: [],
    error: "",
    loading: true,
  });

  const { products } = state;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const products = await client.fetch(`*[_type == "product"]`);
        setState({ products, loading: false });
      } catch (err) {
        setState({ loading: false, error: err.message });
      }
    };
    fetchData();
  }, []);

  const settings = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 4,
    initialSlide: 0,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  console.log(products);
  return (
    <Layout>
      <div className="canvas-container">
        <PorscheCanvas />
      </div>

      <Box>
        <BannerExample />
      </Box>

      <Box mt={5}>
        <div className="cusor-pointer">
          <Slider {...settings}>
            <div>
              <Image
                src="/img/718real.jpg"
                alt="porsche"
                width={450}
                height={300}
              ></Image>
              <NextLink href="/cars">
                <Link>
                  <Button variant="outlined" className={styles.ViewButton}>
                    718
                  </Button>
                </Link>
              </NextLink>
            </div>
            <div>
              <Image
                src="/img/real911.jpg"
                alt="porsche"
                width={450}
                height={300}
              />
              <NextLink href="/cars">
                <Link>
                  <Button variant="outlined" className={styles.ViewButton}>
                    911
                  </Button>
                </Link>
              </NextLink>
            </div>
            <div>
              <Image
                src="/img/panamerareal.jpg"
                alt="porsche"
                width={450}
                height={300}
              />
              <NextLink href="/cars">
                <Link>
                  <Button variant="outlined" className={styles.ViewButton}>
                    Panamera
                  </Button>
                </Link>
              </NextLink>
            </div>
            <div>
              <Image
                src="/img/taycanreal.jpg"
                alt="porsche"
                width={450}
                height={300}
              />
              <NextLink href="/cars">
                <Link>
                  <Button variant="outlined" className={styles.ViewButton}>
                    Taycan
                  </Button>
                </Link>
              </NextLink>
            </div>
            <div>
              <Image
                src="/img/cayennereal.jpg"
                alt="porsche"
                width={450}
                height={300}
              />
              <NextLink href="/cars">
                <Link>
                  <Button variant="outlined" className={styles.ViewButton}>
                   Cayenne
                  </Button>
                </Link>
              </NextLink>
            </div>
            <div>
              <Image
                src="/img/macanreal.jpg"
                alt="porsche"
                width={450}
                height={300}
              />
              <NextLink href="/cars">
                <Link>
                  <Button variant="outlined" className={styles.ViewButton}>
                    Macan
                  </Button>
                </Link>
              </NextLink>
            </div>
          </Slider>
        </div>
      </Box>
    </Layout>
  );
}
