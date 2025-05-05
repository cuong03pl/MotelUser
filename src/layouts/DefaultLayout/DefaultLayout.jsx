import React from "react";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import Support from "../../components/Support/Support";
import GoTop from "../../components/GoTop/GoTop";

export default function DefaultLayout({ children }) {
  return (
    <div className="dark:bg-boxdark-2 dark:text-bodydark">
      <div className="relative flex flex-1 flex-col overflow-y-auto overflow-x-hidden">
        <Header />

        <main>
          <div className="mx-auto max-w-full  p-[150px] bg-[#f4f4f4]">
            {children}
            <Support />
          </div>
        </main>
        <Footer />
        <GoTop />
      </div>
    </div>
  );
}
