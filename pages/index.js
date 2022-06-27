
// import Head from "next/head";
// import Image from "next/image";
import { useEffect, useState } from "react";
import PorscheCanvas from "../canvas/canvas";
import BannerExample from "../components/Carousel";
import Layout from "../components/Layout";

// import styles from "../styles/Home.module.css";
import client from "../utils/client";

export default function Home() {

const [state, setState] = useState({
  products: [],
  error: '',
  loading: true
});

const { products } = state;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const products = await client.fetch(`*[_type == "product"]`);
        setState({products, loading: false});
      } catch(err) {
        setState({ loading: false, error: err.message });
      }
    };
    fetchData();
  }, []);

  console.log(products)
  return (
    <Layout>
      <div className="canvas-container">
        <PorscheCanvas/>
      </div>
      <div>
      <BannerExample/>
      </div>
    </Layout>
  );
}
