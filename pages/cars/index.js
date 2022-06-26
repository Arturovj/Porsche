import { Alert, CircularProgress, Grid} from "@mui/material";

import { useEffect, useState } from "react";

import Layout from "../../components/Layout";
import ProductItem from "../../components/ProductItem";
// import styles from "../styles/Home.module.css";
import client from "../../utils/client";


export default function Cars() {

    

const [state, setState] = useState({
  products: [],
  error: '',
  loading: true
});

const { loading, error, products } = state;

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
      <div>
        {loading ? (
            <div className="loading">
                    <CircularProgress size="8rem" style={{'color': 'yellow'}}/>
            </div>
        
        ) : error? (
        <Alert variant="danger">{error}</Alert>
        ) : (
        <Grid mt={5} className="cars-containers" container spacing={3}>
          {products.map((product) => (
            <Grid item md={4} key={product.slug}>
              <ProductItem product={product} />
              </Grid>
          ))}
        </Grid>
     )}
      </div>
    </Layout>
  );
}
