import React from "react";
import styles from "../../styles/Footer.module.css";
export default function Footer() {
  const year = new Date().getFullYear();
  //console.log(year);
  return (
    <div className={styles.footer}>
      <div className={styles.footer_container}>
        <div className={styles.footer_details_one}>
          <h3>Get to Know US</h3>
          <p>About us</p>
          <p>Careers</p>
          <p>Press Releases</p>
          <p>Amazon Cares</p>
        </div>
        <div className={styles.footer_details_one}>
          <h3>Connect with Us</h3>
          <p>Facebook</p>
          <p>Twitter</p>
          <p>Instagram</p>
        </div>
        <div className={styles.footer_details_two}>
          <h3>Make Money with Us</h3>
          <p>Facebook</p>
          <p>Twitter</p>
          <p>Instagram</p>
        </div>
        <div className={styles.footer_details_two}>
          <h3>Make Money with Us</h3>
          <p>Facebook</p>
          <p>Twitter</p>
          <p>Instagram</p>
        </div>
      </div>
      <div className={styles.lastdetails}>
        <img src="./amazon_footer.png" alt="logo" />
        <p>
          Conditions of Use & Sale &nbsp; &nbsp;&nbsp; Privacy Notice &nbsp;
          &nbsp;&nbsp; Interest-Based Ads &nbsp; &nbsp;&nbsp; © 1996-{year},
          Amazon.com, Inc. or its affiliates
        </p>
      </div>
    </div>
  );
}
