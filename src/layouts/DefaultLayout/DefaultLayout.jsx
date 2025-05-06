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
          <div className="mx-auto max-w-full p-[150px] bg-[#f4f4f4]">
            <div className="flex gap-4">
              <div className="w-[100px] h-[100px]">
                <img src="https://phongtro123.com/images/bds123_120_300.gif" alt="Banner" />
              </div>
              <div className="flex-1">
                {children}
                <Support />
              </div>
            </div>
          </div>
        </main>
        <Footer />
        <GoTop />
      </div>
    </div>
  );
}
