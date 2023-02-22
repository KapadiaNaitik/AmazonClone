import { Divider } from "@mui/material";
import React, { useEffect, useState } from "react";
import styles from "../../styles/Buynow.module.css";
import Empty from "./Empty";
import Option from "./Option";
import Right from "./Right";
import Subtotal from "./Subtotal";

export default function Buynow() {
  const [cartdata, setCartdata] = useState("");

  const getdatabuy = async () => {
    const res = await fetch("/cartdetails", {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      credentials: "include",
    });

    const data = await res.json();

    if (res.status !== 201) {
      alert("no data available");
    } else {
      setCartdata(data.carts);
    }
  };

  useEffect(() => {
    getdatabuy();
  }, []);

  // const [price, setPrice] = useState(0);
  // const totalAmount = () => {
  //     let price = 0
  //     cartdata.map((e) => {
  //         price += e.price.cost
  //     })
  //     setPrice(price)
  // }

  // useEffect(() => {
  //     totalAmount();
  // }, [cartdata]);

  return (
    <>
      {cartdata.length ? (
        <div className={styles.buynow_section}>
          <div className={styles.buynow_container}>
            <div className={styles.left_buy}>
              <h1>Shopping Cart</h1>
              <p>Select all items</p>
              <span className={styles.leftbuyprice}>Price</span>
              <Divider />

              {cartdata.map((e, ind) => {
                return (
                  <>
                    <div className={styles.item_containert} key={ind}>
                      <img src={e.detailUrl} alt="imgitem" />
                      <div className={styles.item_details}>
                        <h3>{e.title.longTitle}</h3>
                        <h3>{e.title.shortTitle}</h3>
                        <h3 className={styles.diffrentprice}>
                          ₹{e.price.cost}.00
                        </h3>
                        <p className={styles.unusuall}>
                          Usually dispatched in 8 days.
                        </p>
                        <p>Eligible for FREE Shipping</p>
                        <img
                          src="https://m.media-amazon.com/images/G/31/marketing/fba/fba-badge_18px-2x._CB485942108_.png"
                          alt="logo"
                        />
                        <Option deletedata={e.id} get={getdatabuy} />
                      </div>
                      <h3 className={styles.item_price}>₹{e.price.cost}.00</h3>
                    </div>
                    <Divider />
                  </>
                );
              })}

              <Subtotal item={cartdata} />
            </div>
            <Right item={cartdata} />
          </div>
        </div>
      ) : (
        <Empty />
      )}
    </>
  );
}
