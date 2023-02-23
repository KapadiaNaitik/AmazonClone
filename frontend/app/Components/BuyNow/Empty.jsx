import React from "react";
import Link from "next/link";
import styles from "../../styles/Buynow.module.css";

export default function Empty() {
  return (
    <div className={styles.buynow_section}>
      <div className={styles.buynow_container}>
        <div className={styles.empty_buy} style={{ padding: "40px 40px" }}>
          <img
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR2xpOr8GbZhxyLr0uD8mEn9L6lsHT-jHq2Kg&usqp=CAU"
            alt="cart img"
          />
          <div className={styles.emptydata}>
            <h1>Your Amazon Basket is empty</h1>
            <p>See recommendations</p>
          </div>
          <Link className={styles.empty_btn} href="/">
            Add Your Items
          </Link>
        </div>
      </div>
    </div>
  );
}
