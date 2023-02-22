import { React, useContext } from "react";
import styles from "../../styles/Navbar.module.css";
import SearchIcon from "@mui/icons-material/Search";
import Badge from "@mui/material/Badge";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import Avatar from "@mui/material/Avatar";
import { Logincontext } from "../Context/ContextProvider";

export default function Navbar() {
  const { account, setAccount } = useContext(Logincontext);
  console.log(account);

  return (
    <div className={styles.header}>
      <div className={styles.nav}>
        <div className={styles.left}>
          <div className={styles.navlogo}>
            <img src="./amazon.png" alt="" />
          </div>
          <div className={styles.nav_searchbar}>
            <input type="text" name="" id="" />
            <div className={styles.search_icon}>
              <SearchIcon />
            </div>
          </div>
        </div>
        <div className={styles.right}>
          <div className={styles.nav_btn}>
            <a
              href="/login
            
            
             "
            >
              Sign In
            </a>
          </div>
          <div className={styles.cart_btn}>
            <Badge badgeContent={4} color="primary">
              <ShoppingCartIcon id={styles.icon} />
              <p>Cart</p>
            </Badge>
          </div>
          <Avatar className={styles.avatar} />
        </div>
      </div>
    </div>
  );
}
