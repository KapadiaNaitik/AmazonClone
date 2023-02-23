"use client";
import React from "react";
import styles from "../../styles/Slide.module.css";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { Divider } from "@mui/material";
import Link from "next/link";

import useRouter from "next/navigation";

export default function Slide({ title, products }) {
  const responsive = {
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 4,
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 2,
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1,
    },
  };
  return (
    <div className={styles.products_section}>
      <div className={styles.products_deal}>
        <h3>{title}</h3>
        <button className={styles.view_btn}>View All</button>
      </div>
      <Divider />
      <Carousel
        responsive={responsive}
        infinite={true}
        draggable={false}
        swipeable={true}
        centerMode={true}
        autoPlay={true}
        autoPlaySpeed={4000}
        keyBoardControl={true}
        showDots={false}
        removeArrowOnDeviceType={["tablet", "mobile"]}
        dotListClass="custom-dot-list-style"
        itemClass="carousel-item-padding-40-px"
        containerClass="carousel-container"
      >
        {products.map((prod) => {
          return (
            <Link href={`/getproducts/${prod.id}`}>
              <div className={styles.products_items}>
                <div className={styles.product_img}>
                  <img src={prod.url} alt="product" />
                </div>
                <p className={styles.products_name}>{prod.title.shortTitle}</p>
                <p
                  className={styles.products_offer}
                  style={{ color: "#  007185" }}
                >
                  {prod.discount}
                </p>
                <p className={styles.lproducts_explore}>{prod.tagline}</p>
              </div>
            </Link>
          );
        })}
      </Carousel>
    </div>
  );
}
