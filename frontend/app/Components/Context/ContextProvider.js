"use client";
import React, { createContext, useState } from "react";

export const Logincontext = createContext("");

const ContextProvider = ({ children }) => {
  const [account, setAccount] = useState("");

  return (
    <>
      <Logincontext.Provider value={{ account, setAccount }}>
        {children}
      </Logincontext.Provider>
    </>
  );
};

export default ContextProvider;
