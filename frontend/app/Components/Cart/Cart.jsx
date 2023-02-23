"use client";
import React, { useContext, useEffect, useState } from "react";
import styles from "../../styles/Cart.module.css";
import { Divider } from "@mui/material";
import { useRouter } from "next/navigation";

import CircularProgress from "@mui/material/CircularProgress";
import { Logincontext } from "../Context/ContextProvider";

export default function Cart({ id }) {
  const { account, setAccount } = useContext(Logincontext);
  //console.log(account);
  const router = useRouter();

  //console.log("cart", id);

  const [proddata, setProdata] = useState("");

  const getData = async () => {
    //console.log("call", id);
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_SERVER}/getproducts/${id}`,
      {
        mode: "cors",

        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        credentials: "include",
      }
    );

    const data = await res.json();
    //console.log(data);

    if (res.status !== 201) {
      alert("no data available");
    } else {
      setProdata(data);
    }
  };

  useEffect(() => {
    setTimeout(getData, 1000);
  }, [id]);

  const addtocart = async (id) => {
    //console.log(JSON.stringify(proddata));
    const check = await fetch(
      `${process.env.NEXT_PUBLIC_SERVER}/addcart/${id}`,
      {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          proddata,
        }),
        credentials: "include",
      }
    );
    const data1 = await check.json();

    if (check.status !== 201) {
      alert("no data available");
    } else {
      setAccount(data1);
    }
  };
  const buy = async (id) => {
    //console.log(JSON.stringify(proddata));
    const check = await fetch(
      `${process.env.NEXT_PUBLIC_SERVER}/addcart/${id}`,
      {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          proddata,
        }),
        credentials: "include",
      }
    );
    const data1 = await check.json();

    if (check.status !== 201) {
      alert("no data available");
    } else {
      setAccount(data1);
      router.push("/buynow");
    }
  };

  return (
    <div className={styles.cart_section}>
      {proddata && Object.keys(proddata).length && (
        <div className={styles.cart_container}>
          <div className={styles.left_cart}>
            <img src={proddata.detailUrl} alt="cart" />
            <div className={styles.cart_btn}>
              <button
                className={styles.cart_btn1}
                onClick={() => addtocart(proddata.id)}
              >
                Add to Cart
              </button>
              <button
                className={styles.cart_btn2}
                onClick={() => buy(proddata.id)}
              >
                Buy Now
              </button>
            </div>
          </div>
          <div className={styles.right_cart}>
            <h3>{proddata.title.shortTitle}</h3>
            <h4>{proddata.title.longTitle}</h4>
            <Divider />
            <p className={styles.mrp}>
              M.R.P. : <del>₹{proddata.price.mrp}</del>
            </p>
            <p>
              Deal of the Day :{" "}
              <span style={{ color: "#B12704" }}>
                ₹{proddata.price.cost}.00
              </span>
            </p>
            <p>
              You save :{" "}
              <span style={{ color: "#B12704" }}>
                {" "}
                ₹{proddata.price.mrp - proddata.price.cost} (
                {proddata.price.discount}){" "}
              </span>
            </p>

            <div className={styles.discount_box}>
              <h5>
                Discount :{" "}
                <span style={{ color: "#111" }}>{proddata.discount}</span>{" "}
              </h5>
              <h4>
                FREE Delivery :{" "}
                <span style={{ color: "#111", fontWeight: "600" }}>
                  Oct 8 - 21
                </span>{" "}
                Details
              </h4>
              <p style={{ color: "#111" }}>
                Fastest delivery:{" "}
                <span style={{ color: "#111", fontWeight: "600" }}>
                  {" "}
                  Tomorrow 11AM
                </span>
              </p>
            </div>
            <p className={styles.description}>
              About the Item :{" "}
              <span
                style={{
                  color: "#565959",
                  fontSize: "14px",
                  fontWeight: "500",
                  letterSpacing: "0.4px",
                }}
              >
                {proddata.description}
              </span>
            </p>
          </div>
        </div>
      )}

      {!proddata ? (
        <div className={styles.circle}>
          <CircularProgress />
          <h2> Loading....</h2>
        </div>
      ) : (
        ""
      )}
    </div>
  );
}
