import React, { useEffect, useState } from "react";
import styles from "../../styles/Buynow.module.css";
import styled, { css } from "styled-components";
import { useRouter } from "next/navigation";

import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";

export default function Right({ item }) {
  const [val, setVal] = useState(false);

  const [price, setPrice] = useState(0);
  const router = useRouter();

  useEffect(() => {
    totalAmount();
  }, [item]);

  const totalAmount = () => {
    let price = 0;
    item.map((item) => {
      price += item.price.cost;
    });
    setPrice(price);
  };

  const processBuy = () => {
    alert("Your Order is Confirmed");
    router.push("/");
  };

  return (
    <div className={styles.right_buy}>
      <img
        src="https://images-eu.ssl-images-amazon.com/images/G/31/checkout/assets/TM_desktop._CB443006202_.png"
        alt="rightimg"
      />
      <div className={styles.cost_right}>
        <p>
          Your order is eligible for FREE Delivery. <br />
          <span style={{ color: "#565959" }}>
            {" "}
            Select this option at checkout. Details
          </span>
        </p>
        <h3>
          Subtotal ({item.length} items):{" "}
          <span style={{ fontWeight: "700" }}> ₹{price}.00</span>
        </h3>
        <button className={styles.rightbuy_btn} onClick={processBuy}>
          Proceed to Buy
        </button>
        <div className={styles.emi} onClick={() => setVal(!val)}>
          Emi available
          {!val ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
        </div>

        <span className={val ? css(styles.show) : css(styles.hide)}>
          {" "}
          Your order qualifies for EMI with valid credit cards (not available on
          purchase of Gold, Jewelry, Gift cards and Amazon pay balance top up).
          Learn more
        </span>
      </div>
    </div>
  );
}
