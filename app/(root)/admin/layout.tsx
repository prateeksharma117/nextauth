import React from "react";
import Navbar from "../../../components/shared/Navbar";
import Sidebar from "../../../components/shared/Sidebar";

const layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <main>
      <Navbar />
      <div className="flex flex-row">
        <Sidebar />
        <section className="wrapper">
          <div className=" w-full">{children}</div>
        </section>
      </div>
    </main>
  );
};

export default layout;
