"use client";
import { Divider } from "@mui/material";
import React, { useState } from "react";
import styles from "../../styles/Register.module.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Link from "next/link";

export default function SignUp() {
  const [userData, setUserdata] = useState({
    fname: "",
    email: "",
    mobile: "",
    password: "",
    cpassword: "",
  });

  // console.log(userData);

  const adddata = (e) => {
    const { name, value } = e.target;
    // console.log(e);
    // console.log(name, value);
    console.log(userData);

    setUserdata((pre) => {
      return {
        ...pre,
        [name]: value,
      };
    });
  };

  const senddata = async (e) => {
    e.preventDefault();

    const { fname, email, mobile, password, cpassword } = userData;
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER}/register`, {
        method: "POST",
        body: JSON.stringify({
          fname: userData.fname,
          email: userData.email,
          mobile: userData.mobile,
          password: userData.password,
          cpassword: userData.cpassword,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      });

      const data = await res.json();
      console.log(data);

      if (res.status === 422 || !data) {
        toast.error("Check Details Again!", {
          position: "top-center",
        });
      } else {
        setUserdata({
          ...userData,
          fname: "",
          email: "",
          mobile: "",
          password: "",
          cpassword: "",
        });
        toast.success("Registration Successfully done !", {
          position: "top-center",
        });
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <section className={styles.section}>
      <div className={styles.sign_container}>
        <div className={styles.sign_header}>
          <img src="./blacklogoamazon.png" alt="signupimg" />
        </div>
        <div className={styles.sign_form}>
          <form method="POST">
            <h1>Create account</h1>
            <div className={styles.form_data}>
              <label htmlFor="name">Your name</label>
              <input
                type="text"
                name="fname"
                onChange={adddata}
                value={userData.fname}
                id="name"
              />
            </div>
            <div className={styles.form_data}>
              <label htmlFor="email">email</label>
              <input
                type="email"
                name="email"
                onChange={adddata}
                value={userData.email}
                id="email"
              />
            </div>
            <div className={styles.form_data}>
              <label htmlFor="mobile">Mobile number</label>
              <input
                type="number"
                name="mobile"
                onChange={adddata}
                value={userData.mobile}
                id="mobile"
              />
            </div>
            <div className={styles.form_data}>
              <label htmlFor="password">Password</label>
              <input
                type="password"
                name="password"
                onChange={adddata}
                value={userData.password}
                id="password"
                placeholder="At least 6 characters"
              />
            </div>
            <div className={styles.form_data}>
              <label htmlFor="passwordg">Password again</label>
              <input
                type="password"
                name="cpassword"
                onChange={adddata}
                value={userData.cpassword}
                id="passwordg"
              />
            </div>
            <button
              type="submit"
              className={styles.signin_btn}
              onClick={senddata}
            >
              Continue
            </button>

            <Divider />

            <div className={styles.signin_info}>
              <p>Already have an account?</p>
              <Link href="/login">Sign in</Link>
            </div>
          </form>
        </div>
        <ToastContainer />
      </div>
    </section>
  );
}
