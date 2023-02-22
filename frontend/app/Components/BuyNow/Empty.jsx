import React from "react";
import { NavLink } from "react-router-dom";
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
          <NavLink className={styles.empty_btn} to="/">
            Add Your Items
          </NavLink>
        </div>
      </div>
    </div>
  );
}
