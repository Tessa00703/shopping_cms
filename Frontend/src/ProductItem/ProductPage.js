import React, { useEffect, useState } from "react";
import { Typography } from "@material-ui/core";
import Box from "@material-ui/core/Box";

import { useParams } from "react-router-dom";
import Client from "../Contentful";
import Grid from "@material-ui/core/Grid";
import ProductPictures from "./ProductPictures";
import ProductRating from "./ProductRating";
import ProductCard from "../Products/ProductCard";
import Button from "@material-ui/core/Button";

const ProductPage = props => {
  const [product, setProduct] = useState([]);
  const [productDesc, setProductDesc] = useState("");
  const [price, setPrice] = useState("");
  const [pic, setPic] = useState([]);
  console.log(pic);

  console.log(product);
  /*
   *  * const tileData = [
   *   {
   *     img: image,
   *     title: 'Image',
   *     author: 'author',
   *     cols: 2,
   *   },
   *   {
   *     [etc...]
   *   },
   * ];*/

  const { id } = useParams();

  useEffect(() => {
    const getProduct = () => {
      try {
        Client.getEntries({ content_type: "product" })
          .then(res => res.items.filter(item => item.sys.id === id))
          .then(res => {
            setProduct(res[0].fields);
            setPrice(res[0].fields.productPrice);
            setProductDesc(
              res[0].fields.productDescription.content[0].content[0].value
            );
            setPic(res[0].fields.productPicture);
          });
      } catch (e) {
        console.log(e);
      }
    };
    getProduct();
  }, []);

  return (
    <>
      <Box p={2}>
        <Grid container spacing={2} alignContent={"center"}>
          <Grid item xs={7}>
            <ProductPictures images={pic} />
          </Grid>
          <Grid item xs={4}>
            <Box pl={2}>
              <Typography variant={"h3"}>{product.productName}</Typography>
              <Box py={2}>
                <ProductRating rating={4} />
                <Typography variant={"h5"}>${price}</Typography>
              </Box>
              <Typography variant={"subtitle1"}>{productDesc}</Typography>
              <Box pt={3}>
                <Button variant={"contained"} color={"secondary"}>
                  Buy
                </Button>
              </Box>
            </Box>
          </Grid>
        </Grid>
      </Box>
    </>
  );
};

export default ProductPage;
