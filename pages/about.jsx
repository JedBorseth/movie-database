import React from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import Image from "next/image";
import NomiLogo from "../public/images/nomi-logo-white.svg";
import MovieLogo from "../public/images/tmdb-logo.svg";

function About() {
  return (
    <div className="wrapper">
      <Header highlighted="about" />
      <main>
        <div className="about-container">
          <Image
            src={NomiLogo}
            alt="Nomi Movies Logo"
            width={175}
            height={175}
          />
          <p className="about-nomi">
            Hi. Welcome to Nomi! This is a live movie database website used to
            keep track of popular, newly released and upcoming films.
            You&apos;re also capable of adding movies to a favourites list, as
            well as creating a watchlist or review for your favourite film.
          </p>

          <h3 className="tmdb-certify">
            This product uses the TMDb API but is not endorsed or certified by
            TMDb.
          </h3>

          <div className="about-logo">
            <Image src={MovieLogo} alt="TMDB Company Logo" />
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}

export default About;
