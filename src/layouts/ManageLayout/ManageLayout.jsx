import React, { useEffect } from "react";
import Header from "./Header";
import Navbar from "./Navbar";
import GoTop from "../../components/GoTop/GoTop";

export default function ManageLayout({ children }) {
  return (
    <div>
      <Header />
      <div className="flex">
        <div className="min-w-[250px]">
          <Navbar />
        </div>
        <div className="w-full bg-transparent">{children}</div>
      </div>
      <GoTop />
    </div>
  );
}
