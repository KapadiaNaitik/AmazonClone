import React, { useContext } from "react";
import styles from "../../styles/Buynow.module.css";
import { Logincontext } from "../Context/ContextProvider";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Option({ deletedata, get }) {
  const { account, setAccount } = useContext(Logincontext);

  const removedata = async (id) => {
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_SERVER}/remove/${id}`,
        {
          method: "GET",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          credentials: "include",
        }
      );

      const data = await res.json();
      // //console.log(data);

      if (res.status === 400 || !data) {
        //console.log("error");
      } else {
        setAccount(data);
        get();
        toast.success("Item remove from cart 😃!", {
          position: "top-center",
        });
      }
    } catch (error) {
      //console.log(error);
    }
  };

  return (
    <div className={styles.add_remove_select} key={deletedata}>
      <select name="" id="">
        <option value="1">1</option>
        <option value="2">2</option>
        <option value="3">3</option>
        <option value="4">4</option>
      </select>
      <p onClick={() => removedata(deletedata)} style={{ cursor: "pointer" }}>
        Delete
      </p>
      <span>|</span>
      <p className={styles.forremovemedia}>Save Or Later</p>
      <span>|</span>
      <p className={styles.forremovemedia}>See More like this</p>
      <ToastContainer />
    </div>
  );
}
