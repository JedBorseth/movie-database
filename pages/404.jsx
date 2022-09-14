import Link from "next/link";
import React from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";

const fourZeroFour = () => {
  return (
    <div className="wrapper">
      <Header />
      <main>
        <div className="error-page">
          <div className="error">404</div>
          <br />
          <br />
          <span className="info">File not found</span>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default fourZeroFour;
