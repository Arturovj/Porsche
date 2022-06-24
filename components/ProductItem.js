import { Button, Card, CardActionArea, CardActions, CardContent, CardMedia, Rating, Typography } from '@mui/material'
import React from 'react'
import NextLink from 'next/link'
import { urlForThumbnail } from '../utils/image'

export default function ProductItem({ product }) {
  return (
    <Card>
        <NextLink href={`/cars/${product.slug.current}`} passHref>
            
              <CardActionArea>
                <CardMedia
                    style={{ height: '200px' }}
                    component="img"
                    alt={product.name}
                    image={urlForThumbnail(product.image)}
                    title={product.name}
                />
                <CardContent>
                    <Typography>{product.name}</Typography>
                    <Rating value={product.rating} readOnly></Rating>
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
