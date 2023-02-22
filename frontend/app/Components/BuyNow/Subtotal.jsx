import React from "react";
import styles from "../../styles/Buynow.module.css";
import { useEffect, useState } from "react";

export default function Subtotal({ item }) {
  const [price, setPrice] = useState(0);

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

  return (
    <div className={styles.sub_item}>
      <h3>
        Subtotal ({item.length} items):
        <strong style={{ fontWeight: "700", color: "#111" }}>
          {" "}
          ₹{price}.00
        </strong>
      </h3>
    </div>
  );
}
