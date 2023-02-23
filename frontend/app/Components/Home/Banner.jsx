"use client";
import React from "react";
import styles from "../../styles/Banner.module.css";
import Carousel from "react-material-ui-carousel";

const data = [
  "https://rukminim1.flixcart.com/flap/1680/280/image/1defb861e409319b.jpg?q=50",
  " https://rukminim1.flixcart.com/flap/1680/280/image/685712c6cefb3c02.jpg?q=50",
  "https://rukminim1.flixcart.com/flap/1680/280/image/8d4150cc4f3f967d.jpg?q=50",
  "https://rukminim1.flixcart.com/flap/1680/280/image/685712c6cefb3c02.jpg?q=50",
];

export default function Banner() {
  return (
    <>
      <Carousel
        className={styles.carousel}
        autoPlay={true}
        animation="slide"
        indicators={false}
        navButtonsAlwaysVisible={true}
        cycleNavigation={true}
        navButtonsProps={{
          style: {
            background: "#fff",
            color: "#494949",
            borderRadius: 0,
            marginTop: -22,
            height: "104px",
          },
        }}
      >
        {data.map((image, i) => {
          return (
            <>
              <img
                src={image}
                alt="img"
                key={i}
                className={styles.banner_img}
              />
            </>
          );
        })}
      </Carousel>
    </>
  );
}
