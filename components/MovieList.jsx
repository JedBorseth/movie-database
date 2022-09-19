import Image from "next/image";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import LikeBtn from "./LikeBtn";
import { useSession } from "next-auth/react";
import useSupabase from "../hooks/useSupabase";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import { useQuery } from "@tanstack/react-query";

function MovieList() {
  // State to hold all movies in question
  const [movies, setMovies] = useState([]);

  // Shows featured movies, these are the most popular movies on TMDB
  const [sort, setSort] = useState("now_playing");
  const [tab, setTab] = useState(0);
  const sortArr = ["now_playing", "popular", "upcoming", "top_rated"];
  const fetchUrl = `https://api.themoviedb.org/3/movie/${sort}?api_key=565e5a5d8e336b7cee4dc5ea476e08f6&language=en-US&page=1`;

  // Image path from TMDB that stores all their images, concat this file path with the image .poster_path to display poster images (I think cast images will be the same too, but not sure, will double check)
  const imgPath = "https://image.tmdb.org/t/p/w500/";

  //Change API link to Jed's, this is currently my API cause I forgot Jed's.
  const getMovies = async () => {
    const fetchAPI = await fetch(fetchUrl);
    const data = await fetchAPI.json();
    setMovies(data);
  };
  const { isLoading, error, data, isFetching, refetch } = useQuery(
    ["repoData"],
    getMovies
  );
  useEffect(() => {
    refetch();
  }, [sort]);

  // Jeds DB Stuff
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
      return favorites[0]?.favorites;
    }
  };
  useEffect(() => {
    if (email) {
      checkUsers().then((newUsr) => {
        if (newUsr) {
          const newUser = async (email) => {
            const { data, error } = await supabase
              .from("favorites")
              .insert([{ user_email: email, favorites: [] }]);
            if (error) {
              console.error(error.details);
            }
          };
          newUser(email);
        } else {
          getFavs().then((favorites) => {
            setFavourites(favorites);
          });
        }
      });
    }
  }, [email]);
  const checkUsers = async () => {
    const { data: email, error } = await supabase
      .from("favorites")
      .select("user_email");
    if (email) {
      let check = true;
      email.forEach((account) => {
        if (account.user_email === session.user.email) {
          check = false;
        }
      });
      return check;
    }
  };

  return (
    <div className="movielist">
      {/* Banner image, will call upon the function to display a random image
      from the top 5 more popular movies. */}

      {/* Tabs to decide which API key is being used. Will start off on popular movies, but will change results based on user input  */}
      <Tabs
        value={tab}
        aria-label="Tabs to decide between now playing, popular, coming soon, and top rated"
        className="tabs"
        variant="scrollable"
        scrollButtons="auto"
        onChange={(e, next) => {
          setTab(next);
          setSort(sortArr[next]);
        }}
      >
        <Tab label="Now Playing" />
        <Tab label="Popular" />
        <Tab label="Coming Soon" />
        <Tab label="Top Rated" />
      </Tabs>

      {/* Will loop through the array stored in the movie state to display all
      movies based on the tabs that the user has selected. Movies displayed are
      displayed in grid and will have a hover to show movie details. (or a click
      on for mobile sections) */}

      {movies?.results?.map((movie) => (
        <div key={movie.id}>
          {favorites && <LikeBtn id={movie.id} favList={favorites} />}
          {isLoading && (
            <div className="spinner-container">
              <div className="spinnerWrap">
                <div className="spinner" id="spinner3"></div>
              </div>
            </div>
          )}
          <Link
            href={{
              pathname: "./indiv",
              query: {
                id: movie.id,
              },
            }}
          >
            <a>
              <div className="index-poster-img">
                <Image
                  src={imgPath + movie?.poster_path}
                  alt={movie?.title}
                  height="400"
                  width="260"
                />

                <div className="hidden">
                  <h2>{movie?.title}</h2>
                  {movie.vote_average < 6 ? (
                    <p className="low">{movie.vote_average * 10}%</p>
                  ) : (
                    <p className="high">{movie.vote_average * 10}%</p>
                  )}
                  <p>
                    {" "}
                    {movie.overview.length < 250
                      ? movie.overview
                      : movie.overview.substr(0, 200) + "..."}
                  </p>
                </div>
              </div>
            </a>
          </Link>
        </div>
      ))}
    </div>
  );
}

export default MovieList;
