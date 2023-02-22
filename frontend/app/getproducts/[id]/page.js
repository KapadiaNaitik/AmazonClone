"use client";

import { useRouter } from "next/navigation";
import Cart from "@/app/Components/Cart/Cart";
import React from "react";

const Productbyid = ({ params }) => {
  const router = useRouter();
  console.log(params.id);
  return <Cart id={params.id}></Cart>;
};

export default Productbyid;
