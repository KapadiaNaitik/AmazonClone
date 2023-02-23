"use client";
import { React, useContext, useState, useEffect } from "react";
import "font-awesome/css/font-awesome.min.css";
import styles from "../../styles/Navbar.module.css";
import SearchIcon from "@mui/icons-material/Search";
import Badge from "@mui/material/Badge";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import Avatar from "@mui/material/Avatar";
import { Logincontext } from "../Context/ContextProvider";
import { ToastContainer, toast } from "react-toastify";
import LogoutIcon from "@mui/icons-material/Logout";
import "react-toastify/dist/ReactToastify.css";
import { makeStyles } from "@material-ui/core";
import { Drawer, IconButton, List, ListItem } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { getProducts } from "../Redux/Actions/action";
import { useSelector, useDispatch } from "react-redux";
import SideBar from "./SideBar";
import { useRouter } from "next/navigation";
import Link from "next/link";

const usestyle = makeStyles({
  component: {
    marginTop: 10,
    marginRight: "-50px",
    width: "300px",
    padding: 50,
    height: "300px",
  },
});

export default function Navbar() {
  const classes = usestyle();
  const [text, setText] = useState();
  const { products } = useSelector((state) => state.getProductsData);
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const [liopen, setLiopen] = useState(true);
  const [dropen, setDropen] = useState(false);
  const router = useRouter();

  const handleClick = (event) => {
    setOpen(event.currentTarget);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const handelopen = () => {
    setDropen(true);
  };

  const handleClosedr = () => {
    setDropen(false);
  };

  const getText = (text) => {
    setText(text);
    setLiopen(false);
  };
  const { account, setAccount } = useContext(Logincontext);

  const getdetailsvaliduser = async () => {
    const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER}/validuser`, {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      credentials: "include",
    });

    const data = await res.json();

    if (res.status !== 201) {
      //console.log("Not yet logged in");
    } else {
      setAccount(data);
    }
  };

  const logoutuser = async () => {
    const res2 = await fetch(`${process.env.NEXT_PUBLIC_SERVER}/logout`, {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      credentials: "include",
    });

    const data2 = await res2.json();

    if (!res2.status === 201) {
      const error = new Error(res2.error);
      throw error;
    } else {
      setAccount(false);
      setOpen(false);
      toast.success("User Logged Out !", {
        position: "top-center",
      });
      router.push("/");
    }
  };

  useEffect(() => {
    dispatch(getProducts());

    getdetailsvaliduser();
  }, [dispatch]);

  //console.log(account);
  const badgeContent = account.carts ? account.carts.length : 0;

  return (
    <div className={styles.header}>
      <div className={styles.nav}>
        <div className={styles.left}>
          <IconButton className={styles.hamburger} onClick={handelopen}>
            <MenuIcon style={{ color: "#fff" }} />
          </IconButton>
          <Drawer open={dropen} onClose={handleClosedr}>
            <SideBar userlog={logoutuser} logclose={handleClosedr} />
          </Drawer>
          <div className={styles.navlogo}>
            <Link href="/">
              {" "}
              <img src="./amazon_footer.png" alt="logo" />{" "}
            </Link>
          </div>
          <div className={styles.nav_searchbar}>
            <input
              type="text"
              name=""
              onChange={(e) => getText(e.target.value)}
              placeholder="Search Your Products"
            />
            <div className={styles.search_icon}>
              <SearchIcon></SearchIcon>{" "}
            </div>
            {text && (
              <List className={styles.extrasearch} hidden={liopen}>
                {products
                  .filter((product) =>
                    product.title.longTitle
                      .toLowerCase()
                      .includes(text.toLowerCase())
                  )
                  .map((product) => (
                    <ListItem>
                      <Link
                        href={`/getproducts/${product.id}`}
                        onClick={() => setLiopen(true)}
                      >
                        {product.title.longTitle}
                      </Link>
                    </ListItem>
                  ))}
              </List>
            )}
          </div>
        </div>
        <div className={styles.right}>
          <div className={styles.nav_btn}>
            {!account ? (
              <Link href="/login">Sign in</Link>
            ) : (
              <button className={styles.final} onClick={logoutuser}>
                Sign Out
              </button>
            )}
          </div>
          {account ? (
            <Link href="/buynow">
              <div className={styles.cart_btn}>
                <Badge badgeContent={account.carts.length} color="secondary">
                  <ShoppingCartIcon></ShoppingCartIcon>
                </Badge>

                <p>Cart</p>
              </div>
            </Link>
          ) : (
            <Link href="/login">
              <div className={styles.cart_btn}>
                <Badge badgeContent={0} color="secondary">
                  <ShoppingCartIcon></ShoppingCartIcon>{" "}
                </Badge>
                <p>Cart</p>
              </div>
            </Link>
          )}

          {account ? (
            <Avatar
              className={styles.avatar2}
              onClick={handleClick}
              title={account.fname.toUpperCase()}
            >
              {account.fname[0].toUpperCase()}
            </Avatar>
          ) : (
            <Avatar className={styles.avatar} onClick={handleClick} />
          )}

          <div className={styles.menu_div}>
            <Menu
              anchorEl={open}
              open={Boolean(open)}
              onClose={handleClose}
              className={classes.component}
            >
              <MenuItem onClick={handleClose} style={{ margin: 10 }}>
                My account
              </MenuItem>
              {account ? (
                <MenuItem
                  onClick={function (event) {
                    handleClose();
                    logoutuser();
                  }}
                  style={{ margin: 10 }}
                >
                  <LogoutIcon style={{ fontSize: 16, marginRight: 3 }} /> Logout
                </MenuItem>
              ) : (
                ""
              )}
            </Menu>
          </div>
          <ToastContainer />
        </div>
      </div>
    </div>
  );
}
