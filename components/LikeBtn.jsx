import { useSession } from "next-auth/react";
import React, { useEffect, useState } from "react";
import { AiOutlineConsoleSql } from "react-icons/ai";
import { IoHeartOutline, IoHeartDislikeOutline } from "react-icons/io5";
import useSupabase from "../hooks/useSupabase";
const LikeBtn = ({ id, favList }) => {
  const { data: session } = useSession();
  const email = session?.user?.email;
  const [found, setFound] = useState(false);
  const [movieData, setMovieData] = useState(null);
  const [action, setAction] = useState(null);
  const supabase = useSupabase();

  useEffect(() => {
    favList.map((movie) => {
      if (String(movie.id) === String(id)) {
        setFound(true);
      }
    });
  }, [favList]);

  const url = `https://api.themoviedb.org/3/movie/${id}?api_key=565e5a5d8e336b7cee4dc5ea476e08f6&language=en-US`;
  const getMovies = async () => {
    fetch(url).then((response) => {
      response.json().then((data) => {
        setMovieData(data);
      });
    });
  };
  const setFavs = async (favorites) => {
    const { data, error } = await supabase
      .from("favorites")
      .update({ favorites: favorites })
      .eq("user_email", email);
  };
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
    if (movieData && action) {
      if (action === "add") {
        pushDb(movieData);
        setAction(null);
      }
      if (action === "remove") {
        deleteDb(movieData);
        setAction(null);
      }
    }
  }, [movieData]);
  const pushDb = (movieData) => {
    if (movieData) {
      getFavs().then((favorites) => {
        const newFavs = [
          ...favorites,
          {
            id: movieData.id,
            movieTitle: movieData.title,
            movieImgURL:
              "https://image.tmdb.org/t/p/w500" + movieData.poster_path,
            rating: movieData.vote_average,
            overview: movieData.overview,
            pageLink: movieData.id,
            releaseDate: movieData.releaseDate,
          },
        ];
        setFavs(newFavs);
        setFound(true);
      });
    }
  };
  const deleteDb = (movieData) => {
    getFavs().then((favorites) => {
      const deleted = favorites.filter((movie) => {
        return movie.id !== movieData.id;
      });
      setFavs(deleted);
      setFound(false);
    });
  };
  return (
    <>
      {found ? (
        <div
          className="like-btn"
          onClick={() => {
            setAction("remove");
            getMovies();
          }}
        >
          <IoHeartDislikeOutline />
        </div>
      ) : (
        <div
          className="like-btn"
          onClick={() => {
            setAction("add");
            getMovies();
          }}
        >
          <IoHeartOutline />
        </div>
      )}
    </>
  );
};

export default LikeBtn;
