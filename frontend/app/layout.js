"use client";
import Navbar from "./Components/Header/Navbar";
import SubNavbar from "./Components/Header/SubNavbar";
import ContextProvider from "./Components/Context/ContextProvider";
import Footer from "./Components/Footer/Footer";
import store from "./store";
import { Provider } from "react-redux";
export default function RootLayout({ children }) {
  return (
    <ContextProvider>
      <html lang="en">
        {}
        <head />

        <body>
          <Provider store={store}>
            <Navbar />
            <SubNavbar />
            {children}
            <Footer />
          </Provider>
        </body>
      </html>
    </ContextProvider>
  );
}
