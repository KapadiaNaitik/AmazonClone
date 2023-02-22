import React from "react";
import styles from "../../styles/SubNavbar.module.css";
export default function SubNavbar() {
  return (
    <div className={styles.new_nav}>
      <div className={styles.nav_data}>
        <div className={styles.left_data}>
          <p>All</p>
          <p>Mobile</p>
          <p>Bestseller</p>
          <p>Fashion</p>
          <p>Customer Services</p>
          <p>Electronics</p>
          <p>Prime</p>
          <p>Today's Deal</p>
          <p>Amazon Pay</p>
        </div>
        <div className={styles.right_data}>
          <img src="./nav.jpg" />
        </div>
      </div>
    </div>
  );
}
