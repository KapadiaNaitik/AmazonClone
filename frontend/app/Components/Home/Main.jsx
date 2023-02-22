"use client";
import React from "react";
import { useEffect } from "react";
import styles from "../../styles/Main.module.css";
import Banner from "./Banner";
import Slide from "./Slide";
import { Divider } from "@mui/material";
import { getProducts } from "../Redux/Actions/action";
import { useDispatch, useSelector } from "react-redux";

export default function Main() {
  const { products } = useSelector((state) => state.getProductsData);
  console.log(products);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getProducts());
  }, [dispatch]);
  return (
    <>
      <div className={styles.home_section}>
        <div>
          <Banner />
        </div>
        <div className={styles.slide_part}>
          <div className={styles.left_slide}>
            <Slide title="Deal Of The Day" products={products} />
          </div>
          <div className={styles.right_slide}>
            <h4>Festive latest launches</h4>
            <img
              src="https://images-eu.ssl-images-amazon.com/images/G/31/img21/Wireless/Jupiter/Launches/T3/DesktopGateway_CategoryCard2x_758X608_T3._SY608_CB639883570_.jpg"
              alt="rightimg"
            />
            <a href="#">see more</a>
          </div>
        </div>

        <Slide title="Today's Deal" products={products} />

        <div className={styles.center_img}>
          <img
            src="https://m.media-amazon.com/images/G/31/AMS/IN/970X250-_desktop_banner.jpg"
            alt=""
          />
        </div>

        <Slide title="Best Seller" products={products} />
        <Slide title="Upto 80% off" products={products} />
      </div>

      <Divider />
    </>
  );
}
