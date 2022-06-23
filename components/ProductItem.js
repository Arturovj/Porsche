import { Button, Card, CardActionArea, CardActions, CardContent, CardMedia, Typography } from '@mui/material'
import React from 'react'
import NextLink from 'next/link'
import { urlForThumbnail } from '../utils/image'

export default function ProductItem({ product }) {
  return (
    <Card>
        <NextLink href={`/product/${product.slug.current}`} passHref>
            
              <CardActionArea>
                <CardMedia
                    component="img"
                    alt={product.name}
                    image={urlForThumbnail(product.image)}
                    title={product.name}
                />
                <CardContent>
                    <Typography>{product.name}</Typography>
                    <Typography>{product.rating} ({product.numReviews} reviews)</Typography>
                </CardContent>
              </CardActionArea>
            
        </NextLink>
        <CardActions>
            <Typography>
                {product.price}$
            </Typography>
            <Button>Add to cart</Button>
        </CardActions>
    </Card>
  )
}
