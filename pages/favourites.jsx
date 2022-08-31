import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import useSupabase from "../hooks/useSupabase";
import { useSession } from "next-auth/react";
import Image from "next/image";
import Footer from "../components/Footer";
const Favourites = () => {
  const [listFavourites, setListFavourites] = useState();
  const { data: session } = useSession();
  const email = session?.user?.email;
  const supabase = useSupabase();
  const getFavs = async () => {
    let { data: favorites, error } = await supabase
      .from("favorites")
      .select("favorites")
      .eq("user_email", email);
    // console.log(favorites[0].favorites);
    if (favorites) {
      return favorites[0]?.favorites;
    }
  };
  const setFavs = async (favorites) => {
    const { data, error } = await supabase
      .from("favorites")
      .update({ favorites: favorites })
      .eq("user_email", email);
  };
  const newUser = async (email) => {
    const { data, error } = await supabase
      .from("favorites")
      .insert([{ user_email: email, favorites: [] }]);
    if (error?.code === "23505") {
      console.log("email is already in db");
    }
  };
  const addFav = (newFav) => {
    getFavs().then((value) => {
      let checkDb = true;
      for (let i = 0; i < value?.length; i++) {
        if (value[i].id === newFav.id) {
          checkDb = false;
        }
      }
      if (checkDb) {
        value.push(newFav);
        setFavs(value);
        console.log("added to db");
      } else {
        console.error(`movie id's must be unique, found ${newFav.id} in db`);
      }
    });
  };
  getFavs().then((value) => {
    setListFavourites(value);
  });
  useEffect(() => {
    if (email) {
      newUser(email);
    }
  }, [session]);
  return (
    <div className="wrapper">
      <Header highlighted="favorites" />
      <main>
        {session ? (
          <>
            <h1 className="text-center">Favourites</h1>
            <button
              onClick={() => {
                addFav({
                  movieTitle: "abcdefg",
                  movieImgURL:
                    "https://image.tmdb.org/t/p/w500//pIkRyD18kl4FhoCNQuWxWu5cBLM.jpg",
                  rating: "73%",
                  overview:
                    "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Corrupti, officia!",
                  releaseDate: "",
                  pageLink: "",
                  id: "16789asdfs5",
                });
              }}
              className="test-btn"
            >
              Add a fake favorite for Test
            </button>
            <button
              onClick={() => {
                getFavs().then((value) => {
                  console.log(value);
                });
              }}
            >
              Console log Favorites
            </button>

            <div className="favorites">
              {listFavourites
                ? listFavourites.map((movie) => {
                    return (
                      <div key={movie.id}>
                        <Image
                          src={movie.movieImgURL}
                          width="100"
                          height="100"
                          alt={movie.overview}
                        />
                        <h1>{movie.movieTitle}</h1>
                      </div>
                    );
                  })
                : null}
            </div>
          </>
        ) : (
          <h1 className="text-center">Sign In To Save Favorites</h1>
        )}
      </main>
      <Footer />
    </div>
  );
};

export default Favourites;
