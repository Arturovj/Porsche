import React, { useContext, useEffect, useState } from "react";
import { useRouter } from "next/router";
import client from "../utils/client";
import Layout from "../components/Layout";
import { urlForThumbnail } from '../utils/image';
import { Store } from '../utils/Store';
import ProductItem from "../components/ProductItem";
import { useSnackbar } from 'notistack';
import {
  Grid,
  List,
  ListItem,
  Box,
  MenuItem,
  Typography,
  Select,
  Rating,
  Button,
  Alert,
  CircularProgress,
} from "@mui/material";
import axios from "axios";

const prices = [
  {
    name: "1$ to 70000$",
    value: "1-70000",
  },
  {
    name: "70000$ to 100000$",
    value: "70000-100000",
  },
  {
    name: "100000$ to 150000$",
    value: "100000-150000",
  },
];

const ratings = [1, 2, 3, 4, 5];

export default function SearchScreen() {
  const router = useRouter();

  const {
    category = "all",
    query = "all",
    price = "all",
    rating = "all",
    sort = "all",
  } = router.query;

  const [state, setState] = useState({
    categories: [],
    products: [],
    error: "",
    loading: true,
  });

  const { loading, products, error } = state;
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const { data } = await axios.get(`/api/cars/categories`);
        setCategories(data);
      } catch (err) {
        console.log(err.message);
      }
    };
    fetchCategories();

    const fetchData = async () => {
      try {
        let gQuery = `*[_type == "product"]`;
        if (category !== "all") {
          gQuery += ` && category match "${category}"`;
        }
        if (query !== "all") {
          gQuery += ` && name match "${query}"`;
        }
        if (price !== "all") {
          const minPrice = Number(price.split("-")[0]);
          const maxPrice = Number(price.split("-")[1]);
          gQuery += ` && price >= ${minPrice} && price <= ${maxPrice}`;
        }
        if (rating !== "all") {
          gQuery += ` && rating >= ${Number(rating)}`;
        }
        let order = "";
        if (sort !== "default") {
          if (sort === "lowest") order = "| order(price asc)";
          if (sort === "highest") order = "| order(price desc)";
          if (sort === "toprated") order = "| order(rating desc)";
        }

        gQuery += `] ${order}`;
        setState({ loading: true });

        const products = await client.fetch(gQuery);
        setState({ products, loading: false });
      } catch (err) {
        setState({ loading: false, error: err.message });
      }
    };
    fetchData();
  }, [category, price, query, rating, sort]);

  const filterSearch = ({ category, sort, searchQuery, price, rating }) => {
    const path = router.pathname;
    const { query } = router;
    if (searchQuery) query.searchQuery = searchQuery;
    if (category) query.category = category;
    if (sort) query.sort = sort;
    if (price) query.price = price;
    if (rating) query.rating = rating;

    router.push({
      pathname: path,
      query: query,
    });
  };

  const categoryHandler = (e) => {
    filterSearch({ category: e.target.value });
  };
  const sortHandler = (e) => {
    filterSearch({ sort: e.target.value });
  };
  const priceHandler = (e) => {
    filterSearch({ price: e.target.value });
  };
  const ratingHandler = (e) => {
    filterSearch({ rating: e.target.value });
  };


  const {
    state: { cart },
    dispatch,
  } = useContext(Store);

  const { enqueueSnackbar } = useSnackbar();
  const addToCartHandler = async (product) => {
    const existItem = cart.cartItems.find((x) => x._id === product._id);
    const quantity = existItem ? existItem.quantity + 1 : 1;
    const { data } = await axios.get(`/api/products/${product._id}`);
    if (data.countInStock < quantity) {
      enqueueSnackbar('Sorry. Product is out of stock', { variant: 'error' });
      return;
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
    enqueueSnackbar(`${product.name} added to the cart`, {
      variant: 'success',
    });
    router.push('/cart');
  };






  return (
    <Layout title="search">
      <Grid container spacing={2}>
        <Grid item md={3}>
          <List>
            <ListItem>
              <Box>
                <Typography>Categories</Typography>
                <Select fullWidth value={category} onChange={categoryHandler}>
                  <MenuItem value="all">All</MenuItem>
                  {categories &&
                    categories.map((category) => (
                      <MenuItem value={category} key={category}>
                        {category}
                      </MenuItem>
                    ))}
                </Select>
              </Box>
            </ListItem>
            <ListItem>
              <Box>
                <Typography>Prices</Typography>
                <Select fullWidth value={price} onChange={priceHandler}>
                  <MenuItem value="all">All</MenuItem>
                  {prices.map((price) => (
                    <MenuItem value={price.value} key={price.value}>
                      {price.name}
                    </MenuItem>
                  ))}
                </Select>
              </Box>
            </ListItem>
            <ListItem>
              <Box>
                <Typography>Rating</Typography>
                <Select fullWidth value={rating} onChange={ratingHandler}>
                  <MenuItem value="all">All</MenuItem>
                  {ratings.map((rating) => (
                    <MenuItem display="flex" value={rating} key={rating}>
                      {rating}
                      <Rating value={rating} readOnly />
                      <Typography component="span">&amp; Up</Typography>
                    </MenuItem>
                  ))}
                </Select>
              </Box>
            </ListItem>
          </List>
          <Grid item md={9}>
            <Grid
              container
              justifyContent="space-between"
              alignItems="center"
            >
                <Grid item>
              {products && products.length !== 0 ? products.length : 'No'}{' '}
              Results
              {query !== 'all' && query !== '' && ' : ' + query}
              {price !== 'all' && ' : Price ' + price}
              {rating !== 'all' && ' : Rating ' + rating + ' & up'}
              {(query !== 'all' && query !== '') ||
              rating !== 'all' ||
              price !== 'all' ? (
                <Button onClick={() => router.push('/search')}>X</Button>
              ) : null}
            </Grid>
             <Grid item>
              <Typography component="span">
                Sort by
              </Typography>
              <Select value={sort} onChange={sortHandler}>
                <MenuItem value="default">Default</MenuItem>
                <MenuItem value="lowest">Price: Low to High</MenuItem>
                <MenuItem value="highest">Price: High to Low</MenuItem>
                <MenuItem value="toprated">Customer Reviews</MenuItem>
              </Select>
            </Grid>
            </Grid>
            <Grid  container spacing={3}>
            {loading ? (
              <CircularProgress />
            ) : error ? (
              <Alert>{error}</Alert>
            ) : (
              <Grid container spacing={3}>
                {products.map((product) => (
                  <Grid item md={4} key={product.name}>
                    <ProductItem
                      product={product}
                      addToCartHandler={addToCartHandler}
                    />
                  </Grid>
                ))}
              </Grid>
            )}
          </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Layout>
  );
}
