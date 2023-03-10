"use client";
import React, { useContext, useState } from "react";
import { Logincontext } from "../Context/ContextProvider";
import { ToastContainer, toast } from "react-toastify";
import { useRouter } from "next/navigation";
import styles from "../../styles/Register.module.css";

import Link from "next/link";

import "react-toastify/dist/ReactToastify.css";

const SignIn = () => {
  const { account, setAccount } = useContext(Logincontext);
  const [logindata, setLogindata] = useState({
    email: "",
    password: "",
  });
  const router = useRouter();

  const adddata = (e) => {
    const { name, value } = e.target;

    setLogindata((pre) => {
      return {
        ...pre,
        [name]: value,
      };
    });
  };

  const senddata = async (e) => {
    e.preventDefault();

    const { email, password } = logindata;
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER}/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          password,
        }),
        credentials: "include",
      });

      const data = await res.json();

      if (res.status === 400 || !data) {
        toast.error("Invalid Details!", {
          position: "top-center",
        });
      } else {
        setAccount(data);
        setLogindata({ ...logindata, email: "", password: "" });
        toast.success("Login Success!", {
          position: "top-center",
        });
        router.push("/");
      }
    } catch (error) {
      //console.log(error.message);
    }
  };

  if (!account) {
    return (
      <section className={styles.section}>
        <div className={styles.sign_container}>
          <div className={styles.sign_header}>
            <img src="./blacklogoamazon.png" alt="signupimg" />
          </div>
          <div className={styles.sign_form}>
            <form method="POST">
              <h1>Sign-In</h1>

              <div className={styles.form_data}>
                <label htmlFor="email">Email</label>
                <input
                  type="email"
                  name="email"
                  onChange={adddata}
                  value={logindata.email}
                  id="email"
                />
              </div>
              <div className={styles.form_data}>
                <label htmlFor="password">Password</label>
                <input
                  type="password"
                  name="password"
                  onChange={adddata}
                  value={logindata.password}
                  id="password"
                  placeholder="At least 6 characters"
                />
              </div>
              <button
                type="submit"
                className={styles.signin_btn}
                onClick={senddata}
              >
                Continue
              </button>
            </form>
            <ToastContainer />
          </div>
          <div className={styles.create_accountinfo}>
            <p>New to Amazon?</p>
            <button>
              {" "}
              <Link href="/register">Create your Amazon Account</Link>
            </button>
          </div>
        </div>
      </section>
    );
  } else {
    toast.success("Already Logged In!", {
      position: "top-center",
    });
    router.push("/");
  }
};

export default SignIn;
