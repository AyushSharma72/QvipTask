import React, { useEffect } from "react";
import Navbar from "../components/Navbar";

function Layout({ children }) {
  return (
    <div>
      <Navbar></Navbar>
      <main
        style={{ height: "92vh", scrollbarWidth: "none" }}
        className="overflow-auto"
      >
        {children}
      </main>
    </div>
  );
}

export default Layout;
