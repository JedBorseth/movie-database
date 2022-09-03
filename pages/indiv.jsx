import React from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { useRouter } from "next/router";

function Indiv() {
  // Using next js link to link movie prop to indiv pageXOffset. Router query received the info props and can be used for the movie info. Router query includes IdleDeadline, title, poster ,rating, release, overview
  const router = useRouter();
  const data = router.query;

  return (
    <div className="wrapper">
      <Header highlighted="indiv" />
      <main>
        {/* Title  */}
        <h1>{router.query.title}</h1>
        {/* Movie Details  */}
        <section>
          {/* Movie Poster  */}
          <div className="movie-poster">
            <img src={router.query.poster} alt={router.query.title} />
          </div>

          {/* Movie description  */}
          <div className="movie-dscrp-div">
            <h2>Description</h2>
            <p className="move-dscrp">{router.query.overview}</p>
          </div>
          {/* Cast details  */}
          <div className="cast">
            <div>
              <h2>Cast</h2>
              <button>View All</button>
            </div>
            {/* Cast 1
            <div className="cast-info">
              <img src={cast_pic} alt={cast_name} className="cast-member" />
            </div>
            <p>{cast_name}</p>
            {/* Cast 2  */}
            {/* <div className="cast-info">
              <img src={cast_pic} alt={cast_name} className="cast-member" />
            </div>
            <p>{cast_name}</p> */}{" "}
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}

export default Indiv;
