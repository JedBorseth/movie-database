import Image from "next/image";
import React, { useEffect, useState } from "react";
import Movie from "./Movie";
import Tab from "./Tab";
import Link from "next/link";
import Footer from "./Footer";

function MovieList() {
  // State to hold all movies in question
  const [movies, setMovies] = useState([]);

  // State to hold top 15 movies to display as banner for our index page. Will choose a random movie among the 5 to display on the index page, will change upon refresh.
  const [featMovie, setFeatMovie] = useState(Math.floor(Math.random() * 16));

  // Shows featured movies, these are the most popular movies on TMDB
  const featuredMovies =
    "https://api.themoviedb.org/3/discover/movie?api_key=565e5a5d8e336b7cee4dc5ea476e08f6&language=en-US&sort_by=popularity.desc";

  // Image path from TMDB that stores all their images, concat this file path with the image .poster_path to display poster images (I think cast images will be the same too, but not sure, will double check)
  const imgPath = "https://image.tmdb.org/t/p/w500/";

  //Change API link to Jed's, this is currently my API cause I forgot Jed's.
  useEffect(() => {
    const getMovies = async () => {
      const fetchAPI = await fetch(featuredMovies);
      const data = await fetchAPI.json();
      setMovies(data);
    };
    getMovies();
  }, []);

  // Adding Favourites
  //State to hold an array of your favourite movies, we can also make this global perhaps, or send this as a prop to the favourite.jsx page.
  const [favourites, setFavourites] = useState([]);

  //Function to actually add movies to the array, will add buttons to the movie posters to trigger this event.
  function addFavMovie(movie) {
    const favouriteList = [...favourites, movie];
    setFavourites(favouriteList);
  }

  return (
    <div className="movielist">
      {/* Banner image, will call upon the function to display a random image
      from the top 5 more popular movies. */}
      {movies?.results && (
        <div className="banner-movie">
          <img
            src={imgPath + movies.results[featMovie].backdrop_path}
            alt={movies.results[featMovie].title}
          />
        </div>
      )}

      {/* Tabs to decide which API key is being used. Will start off on popular movies, but will change results based on user input  */}
      <Tab />

      {/* Will loop through the array stored in the movie state to display all
      movies based on the tabs that the user has selected. Movies displayed are
      displayed in grid and will have a hover to show movie details. (or a click
      on for mobile sections) */}

      {movies?.results?.map((movie) => (
        <div key={movie.id}>
          <Link
            href={{
              pathname: "./indiv",
              query: {
                id: movie.id,
                title: movie.title,
                poster: imgPath + movie.poster_path,
                rating: movie.vote_average,
                release: movie.release_date,
                overview: movie.overview,
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
              </div>
              <div className="hidden">
                <h2>{movie?.title}</h2>
                <p>{movie.vote_average * 10}%</p>
                <p> {movie.overview}</p>
              </div>
            </a>
          </Link>
        </div>
      ))}
    </div>
  );
}

export default MovieList;
