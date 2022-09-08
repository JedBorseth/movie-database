import React from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import Image from "next/image";

function Indiv() {
  // Using next js link to link movie prop to indiv pageXOffset. Router query received the info props and can be used for the movie info. Router query includes IdleDeadline, title, poster ,rating, release, overview

  const [cast, setCast] = useState([]);
  const router = useRouter();
  const castQuery = `https://api.themoviedb.org/3/movie/${router.query.id}/credits?api_key=565e5a5d8e336b7cee4dc5ea476e08f6&language=en-US`;

  useEffect(() => {
    const getCast = async () => {
      const fetchAPI = await fetch(castQuery);
      const castData = await fetchAPI.json();
      setCast(castData);
    };
    getCast();
  }, []);

  return (
    <div className="wrapper">
      <Header highlighted="indiv" />
      <main>
        <div className="indiv-container">
          {/* Movie Poster  */}
          <div className="movie-poster">
            <img src={router.query.poster} alt={router.query.title} />
          </div>

          {/* Movie Details  */}
          <section className="indiv-details">
            {/* Title  */}
            <h1>{router.query.title}</h1>

            {/* Movie description  */}
            <div className="movie-dscrp-div">
              <h2>Description</h2>
              <p className="movie-dscrp">{router.query.overview}</p>
            </div>

            {/* Cast details  */}
            <div className="cast">
              <div>
                <h2>Cast</h2>
                <button>View All</button>
              </div>
            </div>
          </section>
        </div>
      </main>
      <Footer />
    </div>
  );
}

export default Indiv;
