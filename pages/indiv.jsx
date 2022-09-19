import React from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import Image from "next/image";
import { filledInputClasses } from "@mui/material";
import LikeBtn from "../components/LikeBtn";
import { useSession } from "next-auth/react";
import useSupabase from "../hooks/useSupabase";

function Indiv() {
  // Using next js link to link movie prop to indiv pageXOffset. Router query received the info props and can be used for the movie info. Router query includes IdleDeadline, title, poster ,rating, release, overview
  const [movie, setMovie] = useState([]);
  const [cast, setCast] = useState([]);
  const id = useRouter().query.id;
  const imgPath = "https://image.tmdb.org/t/p/";
  // Sizes include w300 w780 w1280 original, must be attached on to the imgPath before use

  const getMovie = async (id) => {
    const fetchUrl = `https://api.themoviedb.org/3/movie/${id}?api_key=565e5a5d8e336b7cee4dc5ea476e08f6&language=en-US`;
    const fetchAPI = await fetch(fetchUrl);
    const movieData = await fetchAPI.json();
    setMovie(movieData);
  };

  const getCast = async (id) => {
    const fetchURL = `https://api.themoviedb.org/3/movie/${id}/credits?api_key=565e5a5d8e336b7cee4dc5ea476e08f6&language=en-US`;
    const fetchAPI = await fetch(fetchURL);
    const castData = await fetchAPI.json();
    setCast(castData);
  };

  useEffect(() => {
    if (id) {
      getMovie(id);
      getCast(id);
    }
  }, [id]);

  const { data: session } = useSession();
  const email = session?.user?.email;
  const supabase = useSupabase();
  const [favorites, setFavourites] = useState(null);
  const getFavs = async () => {
    const { data: favorites, error } = await supabase
      .from("favorites")
      .select("favorites")
      .eq("user_email", email);
    if (favorites) {
      setFavourites(favorites);
    }
  };
  useEffect(() => {
    if (email) {
      getFavs();
    }
  }, [email]);

  return (
    <div className="wrapper">
      <Header highlighted="indiv" />
      <main>
        <div className="indiv-container">
          {/* Banner section with the movie title and basic stats  */}
          {movie.title && (
            <section className="hero">
              <div className="movie-banner">
                {/* Dark filter on it during tablet/desktop media query  */}

                <Image
                  src={imgPath + "w780/" + movie.backdrop_path}
                  alt={movie.title}
                  width="1920"
                  height="700"
                  objectFit="cover"
                  objectPosition="10% 10%"
                />
              </div>
              <div className="movie-rating">
                <h1>{movie.title}</h1>
                <div>
                  <p className="high">
                    {Math.floor(movie.vote_average * 10) / 10}
                  </p>
                  <p>{movie.release_date}</p>
                  {favorites && (
                    <LikeBtn id={id} favList={favorites[0].favorites} />
                  )}
                </div>

                {/* Button for favourites and watchlists if we end up doing them on the indiv page  */}
              </div>
            </section>
          )}

          {/* Movie detail section with the poster (if desktop version) and movie details (overview and cast)  */}
          <section className="deets">
            <div className="movie-poster">
              <Image
                src={imgPath + "w780" + movie.poster_path}
                alt={movie.title}
                // layout="responsive"
                width="250"
                height="375"
                objectFit="contain"
              />
            </div>
            <div className="movie-details">
              {/* Make cast scroll on mobile and regular 4 person on desktop  */}
              <h2>Featured Cast</h2>
              <div className="cast-flex">
                {cast &&
                  cast?.cast?.map((person, amount) => {
                    if (amount >= 4) {
                      return;
                    }
                    return (
                      <div key={person.id} className="cast">
                        <a
                          href={`https://www.themoviedb.org/person/${person.id}`}
                        >
                          {person.profile_path ? (
                            <Image
                              src={`https://image.tmdb.org/t/p/w500/${person.profile_path}`}
                              alt={person.name}
                              width="128"
                              height="192"
                              className="image-round"
                            />
                          ) : (
                            <p className="no-profile">No Profile Picture</p>
                          )}
                          <h3>{person.name}</h3>
                          <p className="character-name">
                            as {person.character}
                          </p>
                        </a>
                      </div>
                    );
                  })}
              </div>

              <div className="overview">
                <h2>Description</h2>
                <p>{movie.overview}</p>
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
