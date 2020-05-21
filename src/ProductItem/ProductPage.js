import React, { useEffect, useState } from "react";
import { Typography } from "@material-ui/core";
import CartBar from "../ShoppingCart/CartBar";
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
  const dummyPics = [
    {
      img:
        "https://www.deutsche-apotheker-zeitung.de/_Resources/Persistent/b/5/2/0/b5204251ad69985f60a6727ae042e174a7a1e7f2/Geschenk%20Pr%C3%A4sent%20Fotolia_112650288_%20Ivan%20Kruk-5216x2938-637x359.jpg",
      title: "sdf",
      author: "sdfg",
      cols: 3
    },
    {
      img:
        "https://i0.web.de/image/652/33158652,pd=5/tolle-geschenke-rente.jpg",
      title: "sdf",
      author: "sdfg",
      cols: 1
    },
    {
      img:
        "https://pbs.twimg.com/profile_images/1135696610/Geschenk_400x400.jpg",
      title: "sdf",
      author: "sdfg",
      cols: 1
    },
    {
      img:
        "https://pbs.twimg.com/profile_images/651908132550111232/a2tgU1qM_400x400.jpg",
      title: "sdf",
      author: "sdfg",
      cols: 1
    },
    {
      img:
        "https://www.pc-magazin.de/bilder/3824199/800x480-c2/Geschenke-auf-Wanderschaft.jpg",
      title: "sdf",
      author: "sdfg",
      cols: 3
    }
  ];

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
          });
      } catch (e) {
        console.log(e);
      }
    };
    getProduct();
  }, []);

  return (
    <>
      <CartBar headerTitle={"Product"} />
      <Box p={2}>
        <Grid container spacing={2} alignContent={"center"}>
          <Grid item xs={7}>
            <ProductPictures images={dummyPics} />
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
