import {
    Alert,
    Box,
    Button,
    Card,
    CircularProgress,
    Grid,
    Link,
    List,
    ListItem,
    Rating,
    Typography,
  } from '@mui/material';
  import Image from 'next/image';
  import NextLink from 'next/link';
  import { useEffect, useState } from 'react';
  import Layout from '../../components/Layout';
  import client from '../../utils/client';
  import { urlFor } from '../../utils/image';
import useStyles from '../../utils/styles';
  
  export default function ProductScreen(props) {
    const classes = useStyles()
    const { slug } = props;
    const [state, setState] = useState({
      product: null,
      loading: true,
      error: '',
    });
    const { product, loading, error } = state;
    useEffect(() => {
      const fetchData = async () => {
        try {
          const product = await client.fetch(
            `
              *[_type == "product" && slug.current == $slug][0]`,
            { slug }
          );
          setState({ ...state, product, loading: false });
        } catch (err) {
          setState({ ...state, error: err.message, loading: false });
        }
      };
      fetchData();
    }, []);
  
    return (
      <Layout title={product?.title}>
        {loading ? (
            <div className="loading">
          <CircularProgress size="8rem" style={{'color': 'yellow'}} />
          </div>
        ) : error ? (
          <Alert variant="error">{error}</Alert>
        ) : (
          <Box className={classes.section}>
            <Box>
              <NextLink href="/cars" passHref>
                <Link>
                  <Typography>Back to Cars section</Typography>
                </Link>
              </NextLink>
            </Box>
            <Grid container spacing={1}>
              <Grid className="image-witdh" item md={6} xs={12}>
                <Image
                  src={urlFor(product.image)}
                  alt={product.name}
                  layout="responsive"
                  width={460}
                  height={340}
                  className="image-properties"
                />
              </Grid>
              <Grid  md={3} xs={12}>
                <List>
                  <ListItem>
                    <Typography component="h2" variant="h2">
                      {product.name}
                    </Typography>
                  </ListItem>
                  <ListItem>Category: {product.category}</ListItem>
                  <ListItem>Brand: {product.brand}</ListItem>
                  <ListItem>
                    <Rating value={product.rating} readOnly></Rating>
                    <Typography >
                      ({product.numReviews} reviews)
                    </Typography>
                  </ListItem>
                  <ListItem>
                    <Typography>Description: {product.description}</Typography>
                  </ListItem>
                </List>
              </Grid>
              <Grid className="box-cart" item md={3} xs={12}>
                <Card>
                  <List>
                    <ListItem>
                      <Grid container>
                        <Grid item xs={6}>
                          <Typography>Price</Typography>
                        </Grid>
                        <Grid item xs={6}>
                          <Typography>${product.price}</Typography>
                        </Grid>
                      </Grid>
                    </ListItem>
                    <ListItem>
                      <Grid container>
                        <Grid item xs={6}>
                          <Typography>Status</Typography>
                        </Grid>
                        <Grid item xs={6}>
                          <Typography>
                            {product.countInStock > 0
                              ? 'In stock'
                              : 'Unavailable'}
                          </Typography>
                        </Grid>
                      </Grid>
                    </ListItem>
                    <ListItem>
                      <Button
                       style={{
                        borderRadius: 10,
                        backgroundColor: "#E3AB36",
                        fontSize: "12px"
                    }}
                      
                      fullWidth variant="contained">
                        Add to cart
                      </Button>
                    </ListItem>
                  </List>
                </Card>
              </Grid>
            </Grid>
          </Box>
        )}
      </Layout>
    );
  }
  
  export function getServerSideProps(context) {
    return {
      props: { slug: context.params.slug },
    };
  }