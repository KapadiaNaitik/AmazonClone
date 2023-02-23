import styles from "../../styles/SideBar.module.css";
import React from "react";
import Avatar from "@mui/material/Avatar";
import Badge from "@mui/material/Badge";
import Link from "next/link";
import { useContext, useState } from "react";
import { Logincontext } from "../Context/ContextProvider";
import { makeStyles } from "@material-ui/core";
import { Divider } from "@mui/material";
import LogoutIcon from "@mui/icons-material/Logout";
const usestyle = makeStyles({
  component: {
    marginTop: 10,
    marginRight: "-50px",
    width: "300px",
    padding: 50,
    height: "300px",
  },
});
export default function SideBar({ userlog, logclose }) {
  const { account, setAccount } = useContext(Logincontext);
  return (
    <div className={styles.rightheader}>
      <div className={styles.right_nav}>
        {account ? (
          <Avatar
            className={styles.avatar2}
            title={account.fname.toUpperCase()}
          >
            {account.fname[0].toUpperCase()}
          </Avatar>
        ) : (
          <Avatar className={styles.avatar} />
        )}
        {account ? <h3>Hello, {account.fname.toUpperCase()}</h3> : ""}
      </div>
      <div className={styles.nav_btn} onClick={() => logclose()}>
        <Link href="/">Home</Link>
        <Link href="/">Shop By Category</Link>
        <Divider style={{ width: "100%", marginLeft: -20 }} />
        <Link href="/" style={{ marginTop: 10 }}>
          Today's Deal
        </Link>
        {account ? (
          <Link href="/buynow">Your Order</Link>
        ) : (
          <Link href="/login">Your Order</Link>
        )}
        <Divider style={{ width: "100%", marginLeft: -20 }} />
        <div className={styles.flag}>
          <Link href="" style={{ marginTop: 14 }}>
            Settings
          </Link>
          <img
            src="./india.png"
            alt="india flag"
            style={{ width: 35, marginLeft: 10 }}
          />
        </div>

        {account ? (
          <div className={styles.flag}>
            <LogoutIcon style={{ fontSize: 18, marginRight: 4 }} />
            <h3
              onClick={() => userlog()}
              style={{ cursor: "pointer", fontWeight: 500 }}
            >
              Log Out
            </h3>
          </div>
        ) : (
          <Link href="/login">Sign in</Link>
        )}
      </div>
    </div>
  );
}
