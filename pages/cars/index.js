import { Alert, CircularProgress, Grid, Typography} from "@mui/material";

import { useContext, useEffect, useState } from "react";

import Layout from "../../components/Layout";
import ProductItem from "../../components/ProductItem";
// import styles from "../styles/Home.module.css";
import client from "../../utils/client";
// import styles from "../../styles/Cars.module.css";
// import SearchIcon from "@material-ui/icons/Search";
// import { useRouter } from "next/dist/client/router";
import { Store } from "../../utils/Store";
import { useSnackbar } from "notistack";
import { useRouter } from "next/router";
import { urlForThumbnail } from "../../utils/image";
import axios from "axios";


export default function Cars() {

  // const router = useRouter();


  const router = useRouter();

  const {
    state: { cart },
    dispatch,
  } = useContext(Store);

  const {enqueueSnackbar} = useSnackbar();

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

  // const isDesktop = useMediaQuery("(min-width:600px)");

  // const [query, setQuery] = useState('');

  // const queryChangeHandler = (e) => {
  //   setQuery(e.target.value);
  // }

  // const submitHandler = (e) => {
  //   e.preventDefault();
  //   router.push(`/cars/search?query=${query}`);
  // }


  const addToCartHandler = async (product) => {
    const existItem = cart.cartItems.find((x) => x._id === product._id);
    const quantity = existItem ? existItem.quantity + 1 : 1;
    const { data } = await axios.get(`/api/cars/${product._id}`);
    if(data.counInStock < quantity) {
        enqueueSnackbar("Not enought items in stock", { variant: "error" });
    }
      dispatch({
      type: 'CART_ADD_ITEM',
      payload: {
        _key: product._id,
        name: product.name,
        countInStock: product.countInStock,
        slug: product.slug.current,
        price: product.price,
        image: urlForThumbnail(product.image),
        quantity,
      },
});
    enqueueSnackbar(`${product.name} added to the cart`, { variant: "success" });
    router.push("/cart");
  };


  return (
    <Layout>
      <Typography mt={5} component="h3" variant="h3">
          Porsche Cars
        </Typography>
      {/* <div>
          <Box className={ isDesktop ? styles.visible : styles.hidden}>
      <form onSubmit={submitHandler}>
      <Box className={styles.searchForm}>
        <InputBase
        name="query"
        className={styles.searchInput}
        placeholder="Search"
        onChange={queryChangeHandler}
        />
        <IconButton
        type="submit"
        className={styles.searchButton}
        aria-label="search"
      
        />
        <SearchIcon/>
      </Box>
      </form>
          
           </Box>
           </div> */}
      <div>
        {loading ? (
            <div className="loading">
                    <CircularProgress size="8rem" style={{'color': 'yellow'}}/>
            </div>
        
        ) : error? (
        <Alert variant="danger">{error}</Alert>
        ) : (
          


        <Grid mt={2} pb={75} className="cars-containers" container spacing={3}>
          {products.map((product) => (
            <Grid item md={4} key={product.slug}>
              <ProductItem product={product}
              addToCartHandler={addToCartHandler} />
              </Grid>
          ))}
        </Grid>
     )}
      </div>
    </Layout>
  );
}
