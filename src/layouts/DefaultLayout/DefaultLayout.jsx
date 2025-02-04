import React from "react";
import Header from "../../components/Header";
import Footer from "../../components/Footer";

export default function DefaultLayout({ children }) {
  return (
    <div className="dark:bg-boxdark-2 dark:text-bodydark">
      <div className="relative flex flex-1 flex-col overflow-y-auto overflow-x-hidden">
        <Header />

        <main>
          <div className="mx-auto max-w-screen-2xl p-4 md:p-6 2xl:p-10">
            {children}
          </div>
        </main>
        <Footer />
      </div>
    </div>
  );
}
