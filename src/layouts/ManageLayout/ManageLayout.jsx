import React from "react";
import Header from "./Header";
import Navbar from "./Navbar";

export default function ManageLayout({ children }) {
  return (
    <div>
      <Header />
      <div className="flex">
        <Navbar />
        {children}
      </div>
    </div>
  );
}
