import React, { useEffect, useState } from "react";
import styles from "../../styles/Buynow.module.css";

import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import { useHistory } from "react-router";

export default function Right({ item }) {
  // console.log(item);
  const [val, setVal] = useState(false);

  const [price, setPrice] = useState(0);

  const history = useHistory("");

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

  const proceesby = () => {
    alert("Your Order is Confirmed");
    history.push("/");
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
        <button className={styles.rightbuy_btn} onClick={proceesby}>
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
